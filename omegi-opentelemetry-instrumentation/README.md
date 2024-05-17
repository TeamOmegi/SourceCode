# Omegi OpenTelemetry Instrumentation

Omegi OpenTelemetry Instrumentation은 Java와 Python 애플리케이션을 위한 계측 솔루션입니다. 이 프로젝트는 OpenTelemetry를 기반으로 구축되었으며, ByteBuddy(Java) 및 Decorator(Python)를 활용하여 메소드 단위의 세분화된 계측을 제공합니다. 상세하게 가공된 에러는 사용자가 에러를 탐지하고 분석하는 데 도움을 줍니다. 제공하는 언어는 추후 늘려갈 예정입니다.

## 언어 간 Trace 상관관계 유지

Omegi Instrumentation은 Java와 Python 서버 간의 트레이스 상관관계를 유지합니다. 양쪽 서버에서 동일한 propagator를 사용함으로써 트레이스 ID와 같은 필수 정보를 일관되게 전달할 수 있습니다. 이를 통해 Java와 Python 서버 간의 요청 흐름을 추적할 수 있으며, 분산 환경에서 end-to-end 트레이싱이 가능해집니다.
또한, 수집된 원격 측정 데이터를 동일한 형식으로 가공하여 Java와 Python에서 생성된 트레이스 데이터를 통합하고 분석할 수 있습니다.
Omegi Instrumentation의 trace 상관관계 유지 기능으로 마이크로서비스 아키텍처에서 서비스 간의 상호작용을 효과적으로 모니터링하고 문제를 진단해보세요.

## Java Instrumentation

Java 애플리케이션을 위한 Omegi Instrumentation은 Omegi OpenTelemetry Javaagent라는 이름의 Java 에이전트로 제공됩니다. 이 에이전트는 ByteBuddy를 사용하여 런타임에 바이트코드를 동적으로 수정하고 메소드 계측 로직을 주입합니다. 수집된 원격 측정 데이터는 Apache Kafka 또는 로깅을 통해 내보낼 수 있습니다.

#### 주요 기능:

메소드 단위의 세분화된 계측
Apache Kafka를 통한 원격 측정 데이터 전송
분산 시스템에서의 에러 발생 경로 파악
유연한 구성 옵션 제공

자세한 내용은 Java Instrumentation README를 참조하세요.

## Python Instrumentation

Python 애플리케이션을 위한 Omegi Instrumentation은 Python 패키지 형태로 제공됩니다. 이 패키지는 Decorator를 활용하여 Python 코드를 분석하고 함수 단위 계측 로직을 삽입합니다. 수집된 원격 측정 데이터는 Kafka 또는 콘솔을 통해 내보낼 수 있습니다.

#### 주요 기능:

함수 단위의 세분화된 계측
Kafka 또는 콘솔을 통한 원격 측정 데이터 전송
분산 시스템에서의 에러 발생 경로 파악
다양한 Python 웹 프레임워크 및 라이브러리 지원 (FastAPI, Django, Flask 등)

자세한 내용은 Python Instrumentation README를 참조하세요.

## Version History

#### Java Instrumentation

v1.0.0 (2023-05-20)

#### Python Instrumentation

v1.0.0 (2023-05-20)

