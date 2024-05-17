package org.omegi.omegiextension;

import com.google.auto.service.AutoService;
import io.opentelemetry.api.trace.propagation.W3CTraceContextPropagator;
import io.opentelemetry.exporter.logging.LoggingSpanExporter;
import io.opentelemetry.sdk.autoconfigure.spi.AutoConfigurationCustomizer;
import io.opentelemetry.sdk.autoconfigure.spi.AutoConfigurationCustomizerProvider;
import io.opentelemetry.sdk.autoconfigure.spi.ConfigProperties;
import io.opentelemetry.sdk.common.Clock;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.IdGenerator;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.SdkTracerProviderBuilder;
import io.opentelemetry.sdk.trace.SpanLimits;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import org.omegi.omegiextension.util.OmegiUtil;

@AutoService(AutoConfigurationCustomizerProvider.class)
public class DemoAutoConfigurationCustomizerProvider
        implements AutoConfigurationCustomizerProvider {

    static {
        System.setProperty("otel.traces.exporter", "OmegiTraceSpanExporter");
        System.setProperty("otel.logs.exporter", "none");
        System.setProperty("otel.metrics.exporter", "none");
    }

    @Override
    public void customize(AutoConfigurationCustomizer autoConfiguration) {
        autoConfiguration
                .addPropagatorCustomizer((textMapPropagator, configProperties) -> W3CTraceContextPropagator.getInstance())
                .addTracerProviderCustomizer(this::combinedTracerProviderCustomizer);
    }

    private SdkTracerProviderBuilder combinedTracerProviderCustomizer(
            SdkTracerProviderBuilder tracerProvider, ConfigProperties config) {
        return configureSdkTracerProvider(sampleConfigureSdkTracerProvider(tracerProvider, config), config);
    }

    private SdkTracerProviderBuilder sampleConfigureSdkTracerProvider(
            SdkTracerProviderBuilder tracerProvider, ConfigProperties config) {

        SdkTracerProviderBuilder sdkTracerProviderBuilder = SdkTracerProvider.builder()
                .setClock(Clock.getDefault())
                .setResource(Resource.getDefault())
                .setIdGenerator(IdGenerator.random())
                .setSpanLimits(SpanLimits.getDefault());

        String property = OmegiUtil.getOmegiExporterKind();
        if (property.equals("kafka")) {
            return sdkTracerProviderBuilder
                    .addSpanProcessor(BatchSpanProcessor.builder(new SampleOmegiTraceSpanExporter()).build());
        } else {
            return sdkTracerProviderBuilder
                    .addSpanProcessor(BatchSpanProcessor.builder(new LoggingSpanExporter()).build());
        }
    }

    private SdkTracerProviderBuilder configureSdkTracerProvider(
            SdkTracerProviderBuilder tracerProvider, ConfigProperties config) {
        String property = OmegiUtil.getOmegiExporterKind();
        if (property.equals("kafka")) {
            return tracerProvider
                    .addSpanProcessor(BatchSpanProcessor.builder(new OmegiTraceSpanExporter()).build());
        } else {
            return tracerProvider
                    .addSpanProcessor(BatchSpanProcessor.builder(new LoggingSpanExporter()).build());
        }
    }
}