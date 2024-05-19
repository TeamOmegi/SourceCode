# Omegi OpenTelemetry Instrumentation for Java

* [Description](#Description)
* [Getting Started](#getting-started)
* [Version History](#version-history)

## Description

Omegi OpenTelemetry Instrumentation for Java는 OpenTelemetry Java Agent를 기반으로 구축된 계측 에이전트입니다. 이 에이전트는 ByteBuddy를 활용하여 메소드 단위의 계측을 수행하고, 수집된 원격 측정 데이터를 Apache Kafka로 전송합니다.

### 주요 기능:

- ByteBuddy를 사용하여 메소드 단위의 세분화된 계측을 통해 애플리케이션에 대한 상세한 정보 수집
- Apache Kafka를 통해 수집된 원격 측정 데이터를 중앙 집중화된 메시지 큐로 전송
- 요청으로부터 발생한 상세한 에러의 흐름과 형식을 제공
- 에이전트의 동작을 사용자가 정의할 수 있는 유연한 구성 옵션 제공

Omegi OpenTelemetry Javaagent를 사용하면 Java 애플리케이션을 심층적으로 모니터링하고 분석할 수 있습니다.
에이전트는 간단한 설정으로 쉽게 적용할 수 있으며, 코드 변경 없는 계측 기능을 제공합니다. 수집된 원격 측정 데이터는 Kafka를 통해 중앙 집중식으로 관리됩니다.
Omegi OpenTelemetry Javaagent는 오픈 소스로 제공되며, 자유롭게 사용하고 확장할 수 있습니다. 

@ Opentelemetry
https://opentelemetry.io/

## Getting Started

Omegi OpenTelemetry Javaagent는 간단한 설정으로 쉽게 적용할 수 있습니다. 다음은 에이전트를 사용하여 애플리케이션을 계측하는 방법입니다.

#### 사전 요구 사항

Java 8 이상의 JDK 또는 JRE가 설치되어 있어야 합니다.
Apache Kafka가 설치 및 구성되어 있어야 합니다 (Kafka 내보내기를 사용하는 경우).

#### 에이전트 설치

최신 버전의 omegi-opentelemetry-javaagent.jar 파일을 다운로드하세요.

https://lab.ssafy.com/s10-final/S10P31A308/omegi-opentelemetry-instrumentation/Instrumentation-Java/releases/latest/download/omegi-opentelemetry-javaagent.jar

애플리케이션의 실행 명령에 다음 JVM 옵션을 추가하세요:
```
java -javaagent:omegi-opentelemetry-javaagent.jar \
     -Domegi.token=<your-token> \
     -Domegi.service.name=<your-service-name> \
     -Domegi.kafka.server=<kafka-server-url> \
     -Domegi.exporter.kind=<exporter-kind> \
     -Domegi.flow.rate=<flow-rate> \
     -Domegi.kafka.topic.error=<your-kafka-error-topic> \
     -Domegi.kafka.topic.flow=<your-kafka-error-flow> \
     -jar app.jar
```

#### 옵션 설명

```
-javaagent:omegi-opentelemetry-javaagent.jar
```
Omegi OpenTelemetry Javaagent를 Java 에이전트로 지정합니다.
<br><br>
```
-Domegi.token=<your-token>
```
에이전트 인증을 위한 토큰을 설정합니다. 토큰 설정 시 omegi 사이트에서 지원하는 실시간 에러 알림 및 에러 노트 작성을 사용할 수 있습니다.
<br><br>
```
-Domegi.service.name=<your-service-name>
```
애플리케이션의 서비스 이름을 지정합니다. omegi 사이트의 서비스를 이용하기 위해서는 사이트에 등록한 프로젝트의 서비스 이름을 기입해야 합니다.
<br><br>
```
-Domegi.kafka.server=<kafka-server-url>
```
Kafka 서버의 URL을 설정합니다. omegi 사이트의 서비스를 이용하기 위해서는 omegi에서 제공하는 kafka 서버 url을 입력합니다. 기본값은 localhost입니다.
<br><br>
```
-Domegi.exporter.kind=<exporter-kind>
```
내보내기 종류를 선택합니다. kafka 또는 logging 중에서 선택할 수 있으며, 기본값은 kafka입니다.
<br><br>
```
-Domegi.flow.rate=<flow-rate>
```
서비스의 정상 요청을 내보내는 비율을 지정합니다. 서비스의 에러는 모두 내보내지만 정상 요청은 내보내기 비율을 지정할 수 있습니다. 기본값은 5이며, 이는 5개의 정상 요청 중 하나를 내보냄을 의미합니다.
<br><br>
```
-Domegi.kafka.topic.error=<your-kafka-error-topic>
```
kafka 내보내기 사용 시 에러를 내보낼 kafka topic을 지정합니다.기본값은 error입니다.
<br><br>
```
-Domegi.kafka.topic.flow=<your-kafka-error-flow>
```
kafka 내보내기 사용 시 정상 요청을 내보낼 kakfa topic을 지정합니다. 기본값은 flow입니다.
<br><br>
#### 에이전트 사용

에이전트를 설치하고 구성한 후에는 애플리케이션을 실행하기만 하면 됩니다. 에이전트는 자동으로 바이트코드를 계측하고 원격 측정 데이터를 수집하여 지정된 내보내기 대상으로 전송합니다. Omegi OpenTelemetry Javaagent는 Opentelemetry 자동 계측을 기반으로 하고 있으며, 자동 계측 옵션도 함께 설정할 수 있습니다. 이에 대해서는 [Opentelemetry Java Automatic Instrumentation](https://opentelemetry.io/docs/languages/java/automatic/)을 참고하세요

## Version History

v1.0.0 (2023-05-20)

- 초기 버전 출시
- ByteBuddy를 활용한 메소드 단위의 세분화된 계측 기능 제공
- Apache Kafka를 통한 원격 측정 데이터 전송
- 유연한 구성 옵션 제공
- Kafka 내보내기와 로깅 내보내기 지원
- 에이전트 인증을 위한 토큰 기반 인증 추가
- 서비스 이름 지정 기능 추가
- 정상 요청 내보내기 비율 지정 기능 추가
- Kafka 내보내기에 사용되는 토픽 이름 구성 옵션 추가
