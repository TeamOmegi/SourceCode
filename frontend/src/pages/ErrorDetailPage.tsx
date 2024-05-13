import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorDetail } from "../api/errorAxios";

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

const ErrorDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error: Error | undefined = location.state?.error;
  const [errorDetail, setErrorDetail] = useState<Error | null>(null);
  const [errorLog, setErrorLog] = useState<ErrorLog | null>(null);

  useEffect(() => {
    const getErrorLog = async () => {
      try {
        if (error) {
          const errorLog = await getErrorDetail(error.errorId);
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

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col items-center justify-center p-5 text-black">
        {errorDetail && (
          <div className="flex h-[90%] w-[90%] flex-col bg-white">
            <div className="box-border flex h-2/6 flex-col p-2">
              <div className="ml-3 mt-1 flex h-2/5 items-center border-b-slate-600 text-3xl font-bold">
                {errorDetail.errorType}
              </div>
              <div className="ml-2 flex h-3/5 flex-col text-base">
                <div className=" flex h-1/3 bg-pink-100">
                  Project명: {errorDetail.project}
                </div>
                <div className=" flex h-1/3 bg-pink-200">
                  Service명: {errorDetail.service}
                </div>
                <div className="flex h-1/3 bg-pink-100">
                  일어난 시간: {errorDetail.time.split("T")[0]}{" "}
                  {errorDetail.time.split("T")[1]}
                </div>
              </div>
            </div>
            <div className="box-border flex h-auto flex-col bg-green-200 px-5 py-2">
              <div className="mt-2 flex flex-col bg-purple-100">
                <div className="text-xl">Error Summary log: </div>
                <div className="ml-2 mt-1">{errorLog?.summary}</div>
              </div>

              <div className="mt-2 flex flex-col bg-purple-200">
                <div className="text-xl">Error log 전체: </div>
                <div className="ml-2 mt-1">{errorLog?.log}</div>
              </div>
            </div>
            <div className="mt-3 box-border flex h-auto bg-yellow-200 p-2">
              <div>
                {errorLog?.noteId === -1 ? (
                  <div>관련 노트 없음!</div>
                ) : (
                  <button
                    className="ml-2 text-blue-600 hover:underline"
                    onClick={handleNoteClick}
                  >
                    관련 노트 보기
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDetailPage;
