import React, { useEffect, useState } from "react";
import useErrorStore from "../../store/useErrorStore";
import { getErrorSolved } from "../../api/projectAxios";

interface Error {
  errorId: number;
  serviceId: number;
  projectId: number;
  solved: boolean;
  type: string;
  time: string;
}
const ErrorList = () => {
  const { errorList, setErrorDelete, setErrorMap } = useErrorStore();

  const handleSolvedError = async (serviceId: number, errorId: number) => {
    const updatedErrorList = errorList.filter(
      (error) => error.errorId != errorId,
    );

    setErrorDelete([...updatedErrorList]);
    await getErrorSolved(errorId);

    setErrorMap(serviceId, "down");

    // 1.  ~~ 에러를 완료하시겠습니까?
    // 2. setErrorList에서 해당 배열지우기
  };
  return (
    <div className=" flex h-full w-full flex-col bg-slate-500">
      <div className="flex h-1/6 w-full items-center bg-slate-300 text-base">
        <div className="ml-5 flex h-full w-[30%]">에러 종류</div>
        <div className="ml-3 flex h-full w-[20%]">프로젝트</div>
        <div className="ml-3 flex h-full w-[20%]">서비스</div>
        <div className="ml-5 flex h-full w-[20%]">날짜</div>
        <div className="flex h-full w-[5%]">상세</div>
      </div>
      <div className="flex h-5/6 w-full flex-col overflow-y-scroll bg-slate-200 text-sm scrollbar-webkit">
        {errorList.map((error) => (
          <div
            key={error.errorId}
            className="box-border flex w-full animate-fade p-1"
          >
            <div className="ml-5 flex h-full w-[30%]">{error.type}</div>
            <div className="flex h-full w-[20%]">{error.projectId}</div>
            <div className="flex h-full w-[20%]">
              {error.serviceId} {error.errorId}
            </div>
            <div className="flex h-full w-[20%]">
              {error.time.split("T")[0]}
            </div>
            <div className="flex h-full w-[5%]">
              <button
                className="box-border rounded-2xl bg-secondary-200 pl-2 pr-2"
                onClick={() =>
                  handleSolvedError(error.serviceId, error.errorId)
                }
              >
                완료
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorList;
