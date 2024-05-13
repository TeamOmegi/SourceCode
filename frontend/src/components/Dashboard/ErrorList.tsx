import React, { useEffect, useState } from "react";
import useErrorStore from "../../store/useErrorStore";

interface Error {
  errorId: number;
  serviceId: number;
  projectId: number;
  solved: boolean;
  type: string;
  time: string;
}
const ErrorList = () => {
  const { errorList, setErrorList } = useErrorStore();

  const test = () => {
    setErrorList({
      errorId: Math.random(),
      serviceId: 100,
      projectId: Math.random(),
      solved: true,
      type: "에러 ㅋㅋ",
      time: "1시 50분",
    });
  };
  const handleDetailClick = () => {};
  return (
    <div className=" flex h-full w-full flex-col bg-slate-500">
      <div
        className="flex h-1/6 w-full items-center bg-slate-300 text-base hover:cursor-pointer"
        onClick={test}
      >
        <div className="ml-3 flex h-full w-[5%]">해결여부</div>
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
            className="animate-fade box-border flex w-full p-1"
          >
            <div className="ml-5 flex h-full w-[5%]">
              {error.solved ? "true" : "false"}
            </div>
            <div className="ml-5 flex h-full w-[30%]">{error.type}</div>
            <div className="flex h-full w-[20%]">{error.projectId}</div>
            <div className="flex h-full w-[20%]">{error.projectId}</div>
            <div className="flex h-full w-[20%]">
              {error.time.split("T")[0]}
            </div>
            <div className="flex h-full w-[5%]">
              <button
                className="box-border rounded-2xl bg-secondary-200 pl-2 pr-2"
                onClick={handleDetailClick}
              >
                상세
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorList;
