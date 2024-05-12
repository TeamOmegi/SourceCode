import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  createdAt: string;
  pastNoteCount: number;
}

const ErrorList = () => {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState<Error[]>([]);
  const handleErrorClick = (error: Error) => {
    navigate(`/omegi/error/${error.errorId}`);
  };

  useEffect(() => {
    if (errorList.length === 0) return;
    console.log("errorList", errorList);
    errorList.map((error) => {
      return error;
    });
    setErrorList([...errorList]);
  }, [errorList]);

  return (
    <div className=" flex h-full w-full flex-col items-start">
      <div className="mt-1 flex h-9 w-full items-center rounded-t-xl bg-slate-300 text-base">
        <div className="ml-5 mt-2 flex h-full w-[30%]">에러 종류</div>
        <div className="ml-3 mt-2 flex h-full w-[30%]">프로젝트</div>
        <div className="ml-5 mt-2 flex h-full w-[30%]">날짜</div>
        <div className="mr-5 mt-2 flex h-full w-[10%]">해결여부</div>
      </div>
      <div className="flex h-[90%] w-full flex-col rounded-b-xl bg-slate-200 text-sm">
        {errorList.map((error) => (
          <div
            key={error.errorId}
            className="box-border flex w-full p-1 hover:cursor-pointer"
            onClick={() => handleErrorClick(error)}
          >
            <div className="ml-5 flex h-full w-[30%]">{error.errorType}</div>
            <div className="flex h-full w-[30%]">{error.project}</div>
            <div className="flex h-full w-[30%]">{error.createdAt}</div>
            <div className="flex h-full w-[10%]">
              {error.isSolved ? "해결" : "미해결"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorList;
