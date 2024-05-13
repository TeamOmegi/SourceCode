import { useEffect, useState } from "react";
import { getErrorDetail } from "../api/errorAxios";

const ErrorDetailPage = ({ errorId }: { errorId: number }) => {
  const [errorDetail, setErrorDetail] = useState<any>(null);

  useEffect(() => {
    const fetchErrorDetail = async () => {
      try {
        console.log(errorId, "errorId");
        const detail = await getErrorDetail(errorId);
        setErrorDetail(detail);
      } catch (error) {
        console.error("Failed to fetch error detail:", error);
      }
    };

    fetchErrorDetail();
  }, [errorId]);

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col items-center justify-center bg-red-200 p-5 text-black">
        {errorDetail && (
          <div className="flex h-[90%] w-[90%] flex-col bg-slate-200">
            <div className="flex h-1/5 bg-blue-200">
              <div>Title: {errorDetail.title}</div>
              <div>Project명: {errorDetail.project}</div>
              <div>Service명: {errorDetail.service}</div>
              <div>일어난 시간: {errorDetail.time}</div>
            </div>
            <div className="flex h-3/5 bg-green-200">
              <div>Error Summary log: {errorDetail.summaryLog}</div>
              <div>Error log 전체: {errorDetail.fullLog}</div>
            </div>
            <div className="flex h-1/5 bg-yellow-200">관련 노트</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDetailPage;
