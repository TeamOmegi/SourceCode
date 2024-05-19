package org.omegi.omegiextension.util;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class OmegiUtil {

	private static final String OMEGI_TOKEN_PROPERTY = "omegi.token";
	private static final String SERVICE_NAME = "omegi.service.name";
	private static final String KAFKA_SERVER = "omegi.kafka.server";
	private static final String OMEGI_FLOW_RATE = "omegi.flow.rate";
	private static final String OMEGI_EXPORTER_KIND = "omegi.exporter.kind";
	private static final String OMEGI_KAFKA_TOPIC_ERROR = "omegi.kafka.topic.error";
	private static final String OMEGI_KAFKA_TOPIC_FLOW = "omegi.kafka.topic.flow";

	public static String getOmegiKafkaTopicFlow() {
		String kafkaTopicFlow = System.getProperty(OMEGI_KAFKA_TOPIC_FLOW);
		if (kafkaTopicFlow == null || kafkaTopicFlow.isEmpty()) {
			return "flow";
		} else {
			return kafkaTopicFlow;
		}
	}

	public static String getOmegiKafkaTopicError() {
		String kafkaTopicError = System.getProperty(OMEGI_KAFKA_TOPIC_ERROR);
		if (kafkaTopicError == null || kafkaTopicError.isEmpty()) {
			return "error";
		} else {
			return kafkaTopicError;
		}
	}

	public static String getOmegiExporterKind() {
		String exporterKind = System.getProperty(OMEGI_EXPORTER_KIND);
		if (exporterKind == null || exporterKind.isEmpty() || exporterKind.equals("kafka")) {
			return "kafka";
		} else {
			return "logging";
		}
	}

	public static int getOmegiFlowRate() {
		String flowRate = System.getProperty(OMEGI_FLOW_RATE);
		if (flowRate == null || flowRate.isEmpty()) {
			return 5;
		} else {
			try {
				return Integer.parseInt(flowRate);
			} catch (NumberFormatException e) {
				return 5;
			}
		}
	}

	public static String getToken() {
		String omegiToken = System.getProperty(OMEGI_TOKEN_PROPERTY);
		if (omegiToken == null || omegiToken.isEmpty()) {
			return "please set omegi.token";
		} else {
			return omegiToken;
		}
	}

	public static String getKafkaServer() {
		String kafkaServer = System.getProperty(KAFKA_SERVER);
		if (kafkaServer == null || kafkaServer.isEmpty()) {
			return "localhost:9092";
		} else {
			return kafkaServer;
		}
	}

	public static String getServiceName() {
		String serviceName = System.getProperty(SERVICE_NAME);
		if (serviceName == null || serviceName.isEmpty()) {
			return "please set omegi.service.name";
		} else {
			return serviceName;
		}
	}

	public static String getFormattedTime(long time) {
		Instant instant = Instant.ofEpochSecond(time / 1_000_000_000L, time % 1_000_000_000L);
		ZoneId zoneId = ZoneId.of("Asia/Seoul");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS")
			.withZone(zoneId);
		return formatter.format(instant);
	}

	public static List<String> analyzeErrorFlow(String errorMessage) {
		List<String> errorFlow = new ArrayList<>();
		Pattern pattern = Pattern.compile("at (.*?)\\.([^.]*?)\\.([^.]*?)\\(");
		Matcher matcher = pattern.matcher(errorMessage);

		while (matcher.find()) {
			String packageName = matcher.group(1);
			String className = matcher.group(2);
			String methodName = matcher.group(3);

			String step = packageName + "." + className + "." + methodName;
			errorFlow.add(step);
		}

		return errorFlow;
	}
}
