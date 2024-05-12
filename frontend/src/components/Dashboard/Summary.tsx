import React, { useEffect, useState } from "react";
import { getErrorSummary, getNoteSummary } from "../../api/dashboardAxios";

const Summary = () => {
  const [errorSummary, setErrorSummary] = useState<any>(null);
  const [noteSummary, setNoteSummary] = useState<any>(null);

  useEffect(() => {
    const getErrorSum = async () => {
      const data = await getErrorSummary();
      console.log("Error Summary??????????", data);
      setErrorSummary(data);
    };

    const getNoteSum = async () => {
      const data = await getNoteSummary();
      console.log("Error Summary??????????", data);
      setNoteSummary(data);
    };

    getErrorSum();
    getNoteSum();
  }, []);

  return (
    <div className="m-1 mr-3 flex h-full w-[35%] flex-col rounded-xl">
      <div className="mb-2 mt-1 flex h-1/2 w-full flex-col rounded-xl bg-white p-1  shadow-md">
        <div className="ml-2 mt-2 box-border flex h-2/6 w-full p-2 text-base font-bold">
          나의 에러 한눈에 보기
        </div>
        <div className="box-border flex h-4/6 px-3 pb-3">
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/SolvedIcon.svg" alt="SolvedIcon" />
            <div className="mt-2 text-sm font-bold">해결 에러</div>

            <div className="mt-1 text-xs">
              {errorSummary ? errorSummary.solvedErrorCount : "기다려.."} 개
            </div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/UnsolvedIcon.svg" alt="UnsolvedIcon" />
            <div className="mt-2 text-sm font-bold">미해결 에러</div>
            <div className="mt-1 text-xs">
              {errorSummary ? errorSummary.unsolvedErrorCount : "Loading..."} 개
            </div>
          </div>
          <div className=" box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/RecentErrorIcon.svg" alt="RecentErrorIcon" />
            <div className="mt-2 text-sm font-bold">최근 에러 발생일</div>
            <div className="mt-1 text-xs">
              {errorSummary
                ? errorSummary.recentlyErrorOccurredAt.split("T")[0]
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-1 flex h-1/2 w-full flex-col rounded-xl bg-white p-1  shadow-md">
        <div className="ml-2 mt-2 box-border flex h-2/6 w-full p-2 text-base font-bold">
          나의 노트 한눈에 보기
        </div>
        <div className="box-border flex h-4/6 px-3 pb-3">
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/NoteCountIcon.svg" alt="NoteCountIcon" />
            <div className="mt-2 text-sm font-bold">작성한 노트 수</div>
            <div className="mt-1 text-xs">
              {noteSummary ? noteSummary.noteCount : "Loading..."} 개
            </div>
          </div>
          <div className="mr-3 box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/MyToAllIcon.svg" alt="MyToAllICon" />
            <div className="mt-2 text-sm font-bold">내가 연결한 노트</div>
            <div className="mt-1 text-xs">
              {noteSummary ? noteSummary.linkCount : "Loading..."} 개
            </div>
          </div>
          <div className="box-border h-full w-1/3 flex-col rounded-xl bg-slate-100 px-3 py-2">
            <img src="/icons/AllToMyIcon.svg" alt="AllToMyIcon" />
            <div className="mt-2 text-sm font-bold">나를 연결한 노트</div>
            <div className="mt-1 text-xs">
              {noteSummary ? noteSummary.backlinkCount : "Loading..."} 개
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
