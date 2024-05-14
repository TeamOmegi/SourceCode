package org.omegi.omegiextension;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.sdk.common.CompletableResultCode;
import io.opentelemetry.sdk.common.InstrumentationScopeInfo;
import io.opentelemetry.sdk.trace.data.EventData;
import io.opentelemetry.sdk.trace.data.SpanData;
import io.opentelemetry.sdk.trace.export.SpanExporter;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.ByteArraySerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.omegi.omegiextension.util.OmegiUtil;

public class OmegiTraceSpanExporter implements SpanExporter {

	private static final Logger logger = Logger.getLogger(OmegiTraceSpanExporter.class.getName());
	private final AtomicBoolean isShutdown = new AtomicBoolean();
	private final Gson gson = new Gson();
	private final KafkaProducer<String, byte[]> kafkaProducer;

	public OmegiTraceSpanExporter() {
		this.kafkaProducer = createKafkaProducer();
	}

	private static KafkaProducer<String, byte[]> createKafkaProducer() {
		Properties properties = new Properties();
		properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, OmegiUtil.getKafkaServer());
		properties.put(ProducerConfig.ACKS_CONFIG, "all");
		properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
		properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, ByteArraySerializer.class);
		return new KafkaProducer<>(properties);
	}

	public static OmegiTraceSpanExporter create() {
		return new OmegiTraceSpanExporter();
	}

	@Override
	public CompletableResultCode export(Collection<SpanData> spans) {
		logger.info("Enter Omegi Exporter");
		if (isShutdown.get()) {
			return CompletableResultCode.ofFailure();
		}

        /*
        에러 데이터면 error info 생성
        에러가 아니면 종료
         */
		JsonObject outerJson = new JsonObject();

		SpanData firstSpan = spans.stream().findFirst().orElse(null);

		if (firstSpan != null) {
			StatusCode statusCode = firstSpan.getStatus().getStatusCode();
			if (statusCode != StatusCode.ERROR) {
				return CompletableResultCode.ofSuccess();
			} else {
				InstrumentationScopeInfo instrumentationScopeInfo = firstSpan.getInstrumentationScopeInfo();

				String traceId = firstSpan.getTraceId();
				outerJson.addProperty("tracer",
					instrumentationScopeInfo.getName() + ":" + (instrumentationScopeInfo.getVersion() == null ? ""
						: instrumentationScopeInfo.getVersion()));
				outerJson.addProperty("traceId", traceId);
				outerJson.addProperty("token", OmegiUtil.getToken());
				outerJson.addProperty("serviceName", OmegiUtil.getServiceName());

				JsonObject exceptionJson = new JsonObject();

				if (firstSpan.getEvents() != null && !firstSpan.getEvents().isEmpty()) {
					EventData eventData = firstSpan.getEvents().get(0);
					String stacktrace = eventData.getAttributes().get(AttributeKey.stringKey("exception.stacktrace"));
					exceptionJson.addProperty("exception.type",
						eventData.getAttributes().get(AttributeKey.stringKey("exception.type")));
					exceptionJson.addProperty("exception.message",
						eventData.getAttributes().get(AttributeKey.stringKey("exception.message")));

					JsonObject stackFlowData = new JsonObject();
					List<String> stacktraceList = OmegiUtil.analyzeErrorFlow(stacktrace);

					int flowNumber = 1;
					for (String traced : stacktraceList) {
						stackFlowData.addProperty("step." + flowNumber++, traced);
					}

					exceptionJson.add("exception.flow", stackFlowData);
					exceptionJson.addProperty("exception.stacktrace", stacktrace);
				}

				outerJson.add("error", exceptionJson);
			}
		}

        /*
        상세 span 정보
         */

		List<JsonObject> spanList = new ArrayList<>();

		for (SpanData span : spans) {
			JsonObject jsonData = new JsonObject();
			jsonData.addProperty("name", span.getName());
			jsonData.addProperty("spanId", span.getSpanId());
			jsonData.addProperty("parentSpanId", span.getParentSpanId());
			jsonData.addProperty("kind", span.getKind().toString());
			jsonData.addProperty("spanEnterTime", OmegiUtil.getFormattedTime(span.getStartEpochNanos()));
			jsonData.addProperty("spanExitTime", OmegiUtil.getFormattedTime(span.getEndEpochNanos()));
			jsonData.add("attributes", gson.toJsonTree(span.getAttributes()));

			spanList.add(jsonData);
		}

		outerJson.add("spans", gson.toJsonTree(spanList));

        /*
        카프카 전송
         */
		ProducerRecord<String, byte[]> record = new ProducerRecord<>("error",
			outerJson.toString().getBytes(StandardCharsets.UTF_8));
		try {
			RecordMetadata recordMetadata = kafkaProducer.send(record).get();
			logger.info(recordMetadata.toString());
		} catch (InterruptedException e) {
			logger.warning(e.getLocalizedMessage());
			throw new RuntimeException(e);
		} catch (ExecutionException e) {
			logger.warning(e.getLocalizedMessage());
			throw new RuntimeException(e);
		}
		return CompletableResultCode.ofSuccess();
	}

	@Override
	public CompletableResultCode flush() {
		return CompletableResultCode.ofSuccess();
	}

	@Override
	public CompletableResultCode shutdown() {
		return CompletableResultCode.ofSuccess();
	}
}