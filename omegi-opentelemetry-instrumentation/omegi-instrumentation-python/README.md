# Omegi Instrumentation for Python

## Description

Opentelemetry Instrumentation을 이용한 파이썬 자동 계측기 라이브러리입니다.  
Function 단위로 span을 생성하며, 분산 시스템에서의 에러 발생 시 로그 추적을 돕는 기능을 제공합니다.  
사용자는 어플리케이션에서 에러가 발생할 경우 분산 시스템에서 에러 발생 경로를 파악할 수 있으며, 각 서비스에서 omegi-instrumentation이 활성화 되어 있어야 합니다.  

@ Opentelemetry  
https://opentelemetry.io/


## Getting Started

### Installing
Pypi에 업로드 된 라이브러리를 통해 프로젝트에 설치

```terminal
pip install omegi-instrumentation-python
```


### Environment variables  
#### 사용되는 환경 변수 목록  
- OMEGI_SERVICE_NAME : default(test-server)
  - 자동 계측을 적용할 서비스 이름
  - 웹에 서비스 등록 할 때 작성한 이름으로 작성
- OMEGI_TOKEN : default(None)
  - 웹에서 서비스 등록 후 발급된 토큰 입력
- OMEGI_PROJECT_ROOT : default(/app)
  - 자동 계측을 적용할 프로젝트의 루트 폴더 경로 입력
  - Docker 파일을 통해 실행할 경우 설정한 WORKDIR 입력
- OMEGI_FLOW_RATE : default(5)
  - 서버
- OMEGI_EXPORTER_KIND : default(kafka)
  - kafka
  - console
  - 추가 예정
- OMEGI_KAFKA_SERVER : default(localhost:9092)
  - ','로 각 uri 구분
- OMEGI_KAFKA_TOPIC_ERROR : default(error)
- OMEGI_KAFKA_TOPIC_FLOW : default(flow)


#### Example

```Dockerfile
# Dockerfile
ENV OMEGI_SERVICE_NAME=test1
ENV OMEGI_TOKEN=your_token
ENV OMEGI_PROJECT_ROOT=/app
ENV OMEGI_FLOW_RATE=5
# Kafka Configuration Variables
ENV OMEGI_KAFKA_CONFIG=localhost:9091,localhost:9092
ENV OMEGI_KAFKA_TOPIC_ERROR=error
ENV OMEGI_KAFKA_TOPIC_FLOW=flow
```


## Executing Program
### 실행 방법
1. main.py (가장 루트 실행 파일) 파일에 OmegiInstrumentor를 import 합니다.
2. app 객체를 생성자에 매개변수로 넘겨주며 OmegiInstrumentor 객체를 생성합니다.
3. instrument() 메서드를 실행합니다.

실행 후 자동으로 사용자의 모듈을 검사하며 함수들에 계측 데코레이터를 적용합니다.  
Opentelemetry에서 제공되는 Instrumentation 중 일부는 프로젝트의 라이브러리를 탐색한 뒤 자동으로 실행됩니다.  
필요할 경우 Opentelemetry의 다른 Instrumentation 라이브러리를 추가 설치 후 실행하여 계측을 적용할 수 있습니다.  

#### 기본 실행 계측 라이브러리
  - opentelemetry-instrumentation-fastapi
  - opentelemetry-instrumentation-django
  - opentelemetry-instrumentation-flask
  - opentelemetry-instrumentation-elasticsearch
  - opentelemetry-instrumentation-mysql

#### Opentelemetry Python Instrumentation List  
- https://opentelemetry-python-contrib.readthedocs.io/en/latest/index.html

#### Example
```python
# Fast API를 사용하는 서버의 경우
app = FastAPI()
OmegiInstrumentor(app).instrument()

# 추가 계측기 실행 (Requests 계측기 예시)
from opentelemetry.instrumentation.requests import RequestsInstrumentor
RequestsInstrumentor().instrument()
```


## Version History
- 1.0.0
  - Initial Release
