import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorList } from "../../api/errorAxios";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

interface Props {
  selectedProject: string;
}

const ErrorList = ({ selectedProject }: Props) => {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState<Error[]>([]);

  const handleErrorClick = (error: Error) => {
    navigate(`/omegi/error/${error.errorId}`, { state: { error } }); // 에러 정보를 상태로 함께 전달
  };

  useEffect(() => {
    const getErrors = async () => {
      try {
        const response = await getErrorList(selectedProject, "", false);
        setErrorList(response.errors);
      } catch (error) {
        console.error("Failed to fetch error list:", error);
      }
    };

    getErrors();
  }, [selectedProject]);

  // 에러 타입의 마지막 . 뒷부분만 가져오기
  const getLastErrorType = (errorType: string) => {
    const lastIndex = errorType.lastIndexOf(".");
    if (lastIndex !== -1) {
      return errorType.substring(lastIndex + 1);
    } else {
      return "..." + "." + errorType;
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-start overflow-y-scroll scrollbar-webkit">
      <div className="mt-1 flex h-9 w-full items-center rounded-t-xl bg-slate-300 text-base">
        <div className="ml-5 mt-2 flex h-full w-[10%] justify-center">
          해결여부
        </div>
        <div className="ml-5 mt-2 flex h-full w-[35%] justify-center">
          에러 종류
        </div>
        <div className="ml-3 mt-2 flex h-full w-[15%] justify-center">
          서비스
        </div>
        <div className="ml-3 mt-2 flex h-full w-[15%] justify-center">
          프로젝트
        </div>
        <div className="ml-3 mr-5  mt-2 flex h-full w-[15%] justify-center">
          날짜
        </div>
      </div>
      <div className="flex  w-full flex-col rounded-b-xl bg-slate-200 text-sm">
        {errorList.map((error) => (
          <div
            key={error.errorId}
            className="mb-2 flex w-full items-center hover:cursor-pointer"
            onClick={() => handleErrorClick(error)}
          >
            <div className="ml-5 mt-2 flex h-full w-[10%] justify-center">
              {error.isSolved ? "해결" : "미해결"}
            </div>
            <div className="ml-5 mt-2 flex h-full w-[35%] justify-center">
              ... {getLastErrorType(error.errorType)}
            </div>
            <div className="ml-3 mt-2 flex h-full w-[15%] justify-center">
              {error.service}
            </div>
            <div className="ml-3 mt-2 flex h-full w-[15%] justify-center">
              {error.project}
            </div>
            <div className="mr-5 mt-2 flex h-full w-[15%] justify-center">
              {error.time.split("T")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorList;
