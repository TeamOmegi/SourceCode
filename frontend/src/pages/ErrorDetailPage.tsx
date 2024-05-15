import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorDetail } from "../api/errorAxios";
import Header from "../components/Common/Header.tsx";
import ErrorDetailDropdown from "../components/Error/ErrorDetailDropdown.tsx";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

interface ErrorLog {
  summary: string;
  log: string;
  noteId: number;
}

interface Props {
  noteId: number;
}

// [UPDATED] 변경
// 중요!!!
// 인터페이스 ErrorDetail 형식 수정함
// 더미데이터 예시로 보고 지우면 됨
// axios 꺼놔서 다시 살리고 테스트 필요
// 안중요
// 뒤로가기 아이콘 넣어서 onClick 함수 내용 채워야 함
// 대충 navigate 시켜줘

const ErrorDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error: Error | undefined = location.state?.error;
  //TODO ErrorDetail 형식으로 변경
  const [errorDetail, setErrorDetail] = useState<Error | null>(null);
  // 원본 코드
  // const [errorDetail, setErrorDetail] = useState<Error | null>(null);
  const [errorLog, setErrorLog] = useState<ErrorLog | null>(null);

  // //TODO 더미데이터 삭제
  // const dummyErrorDetail: Error = {
  //   type: "java.lang.ArithmeticException",
  //   summary:
  //     "step.1: org.omegi.mockjavaa.service.MockServiceJavaA.getError\nstep.2: org.omegi.mockjavaa.controller.MockController.toError\nstep.3: jdk.internal.reflect.GeneratedMethodAccessor29.invoke\nstep.4: java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke\nstep.5: java.base/java.lang.reflect.Method.invoke",
  //   log: "java.lang.ArithmeticException\n\tat org.omegi.mockjavaa.service.MockServiceJavaA.getError(MockServiceJavaA.java:13)\n\tat org.omegi.mockjavaa.controller.MockController.toError(MockController.java:19)\n\tat jdk.internal.reflect.GeneratedMethodAccessor29.invoke(Unknown Source)\n\tat java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.base/java.lang.reflect.Method.invoke(Method.java:568)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:255)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:188)\n\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:926)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:831)\n\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)\n\tat org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:903)\n\tat jakarta.servlet.http.HttpServlet.service(HttpServlet.java:564)\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)\n\tat jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:206)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:150)\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:175)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:150)\n\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:175)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:150)\n\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:175)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:150)\n\tat org.springframework.web.servlet.v6_0.OpenTelemetryHandlerMappingFilter.doFilter(OpenTelemetryHandlerMappingFilter.java:69)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:175)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:150)\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:175)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:150)\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:167)\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:90)\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:482)\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:115)\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:93)\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:344)\n\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:391)\n\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)\n\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:896)\n\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1736)\n\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)\n\tat org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191)\n\tat org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659)\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)\n\tat java.base/java.lang.Thread.run(Thread.java:833)\n",
  //   trace: [
  //     {
  //       spanId: "7f0934f2ee135c14",
  //       parentSpanId: "38fb345158447780",
  //       serviceName: "mock-java-a",
  //       name: "org.omegi.mockjavaa.service.MockServiceJavaA.getError",
  //       kind: "INTERNAL",
  //       attributes: {
  //         arguments: "[]",
  //       },
  //       enterTime: "2024-05-10T00:40:20.767",
  //       exitTime: "2024-05-10T00:40:20.768",
  //     },
  //     {
  //       spanId: "38fb345158447780",
  //       parentSpanId: "0000000000000000",
  //       serviceName: "mock-java-a",
  //       name: "GET /java-a/error",
  //       kind: "SERVER",
  //       attributes: {
  //         "url.scheme": "http",
  //         "user_agent.original":
  //           "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Whale/3.23.214.17 Safari/537.36",
  //         "server.port": 8081,
  //         "http.response.status_code": 500,
  //         "network.protocol.version": "1.1",
  //         "network.peer.address": "192.168.65.1",
  //         "server.address": "localhost",
  //         "client.address": "192.168.65.1",
  //         "url.path": "/java-a/error",
  //         "error.type": "500",
  //         "network.peer.port": 56659,
  //         "http.request.method": "GET",
  //         "http.route": "/java-a/error",
  //       },
  //       enterTime: "2024-05-10T00:40:20.759",
  //       exitTime: "2024-05-10T00:40:20.821",
  //     },
  //   ],
  //   time: "2024-05-09T06:40:23",
  //   projectId: 12,
  //   serviceId: 25,
  //   noteId: -1,
  // };

  // //TODO 삭제 필요
  // useEffect(() => {
  //   setErrorDetail(dummyErrorDetail);
  // }, []);

  // TODO 진짜 useEffect (복원 필요)
  useEffect(() => {
    const getErrorLog = async () => {
      try {
        if (error) {
          const errorLog = await getErrorDetail(error.errorId);
          console.log(errorLog);
          setErrorDetail(error);
          setErrorLog(errorLog);
        }
      } catch (error) {
        console.error("Failed to fetch error detail:", error);
      }
    };
    getErrorLog();
  }, [error]);

  const handleNoteClick = ({ noteId }: Props) => {
    if (noteId !== -1) {
      navigate(`/note/${noteId}`); // 관련 노트의 상세 페이지로 이동
    }
  };

  // TODO 뒤로가기 버튼 로직 구현 (노트 리스트로 이동?)
  const handelBackButtonClick = () => {
    console.log("CLICKED!");
  };

  return (
    <div className="bg-default box-border flex h-full w-full flex-col px-8 pb-8 pt-12">
      {/* 제목 */}
      <div className="mb-5 box-border flex h-fit w-full flex-col justify-between">
        <div className="box-border flex h-fit w-full items-start">
          <img
            className="mr-3 mt-2 aspect-square h-10 opacity-30 hover:cursor-pointer"
            alt="Dropdown_Icon"
            src={"/icons/BackLink.svg"}
            onClick={handelBackButtonClick}
          />
          <Header
            title={errorDetail?.type || "java.lang.ArrayIndexOutOfBounds"}
          />
        </div>
        <div className="box-border flex h-fit w-full justify-between px-5">
          <div className="flex h-fit w-fit">
            <div className="mr-3 flex h-fit w-fit items-center justify-center rounded-xl bg-[#98B9E8FF] px-5 py-2 text-white shadow-md">
              {error?.project}
            </div>
            <div className="mr-3 flex h-fit w-fit items-center justify-center rounded-xl bg-[#BBB7EA] px-5 py-2 text-white shadow-md">
              {error?.service}
            </div>
            <div className="flex h-fit w-fit rounded-xl bg-gray-200 px-3 py-2 text-gray-800 shadow-md">
              {errorDetail?.time.split("T")[0] +
                " " +
                errorDetail?.time.split("T")[1]}
            </div>
          </div>
          <div className="flex h-fit w-fit">
            {/*TODO 관련 노트 보기 뭔가요>*/}
            <div className="mr-3 box-border flex h-fit w-fit items-center justify-center rounded-xl bg-fuchsia-100 px-5 py-2">
              관련 노트 보기
            </div>
            {/*TODO 노트 작성 / 조회 버튼 있나요?*/}
            <div className="box-border flex h-fit w-fit items-center justify-center rounded-xl bg-fuchsia-100 px-5 py-2">
              노트 작성
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll scrollbar-webkit">
        {/* 로그 Trace */}
        <div className="mb-7 box-border flex h-fit w-full flex-col justify-between">
          <div className="my-2 ml-2 flex items-center justify-start text-lg font-medium text-gray-600">
            Trace
          </div>
          {errorDetail?.trace.map((span) => (
            <ErrorDetailDropdown span={span}></ErrorDetailDropdown>
          ))}
        </div>

        {/* 로그 요약 */}
        <div className="mb-7 box-border flex h-fit w-full flex-col justify-between">
          <div className="my-2 ml-2 flex items-center justify-start text-lg font-medium text-gray-600">
            Summary
          </div>
          <div className="w-full rounded-md border-[1px] border-gray-200 bg-gray-100 p-4 shadow-md">
            {errorDetail?.summary}
          </div>
        </div>

        {/* 로그 원문 */}
        <div className="box-border flex h-fit w-full flex-col justify-between pb-7">
          <div className="my-2 ml-2 flex items-center justify-start text-lg font-medium text-gray-600">
            Log
          </div>
          <div className="w-full rounded-md bg-gray-200 p-4 shadow-md">
            {errorDetail?.log}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDetailPage;
