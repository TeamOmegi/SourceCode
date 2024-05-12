import { useEffect, useState } from "react";
import ErrorList from "../components/Error/ErrorList";
import { getErrorList } from "../api/errorAxios";
import CustomPjtSelect from "../components/Error/CustomPjtSelect";

interface Error {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

const ErrorListPage = () => {
  const [errorList, setErrorList] = useState<Error[]>([]);
  const [allProject, setAllProject] = useState<string[]>([]);
  const [searchProject, setsearchProject] = useState<string>("");
  const [searchService, setSearchService] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    const getErrors = async () => {
      const allErrorData = await getErrorList("", "");
      console.log("성공", allErrorData);
      setErrorList(allErrorData.errors);
      setAllProject([...allErrorData.projects]);
    };

    getErrors();
  }, []);

  const handleSearch = async () => {
    const allErrorData = await getErrorList(searchProject, searchService);
    setErrorList([...allErrorData.errors]);
  };

  const handleSelectProject = (project: string) => {
    setSelectedProject(project);
  };

  return (
    <div className="bg-default">
      <div className="flex h-1/6 w-full rounded-xl bg-blue-300 ">
        <div className="m-5 flex items-center justify-center text-2xl font-bold">
          에러 리스트
        </div>
      </div>
      <div className="flex h-5/6 w-full flex-col items-center justify-center rounded-xl">
        <div className="box-border flex h-[10%] w-full justify-between px-8 py-1">
          <div className=" flex h-[80%]">
            {/* 프로젝트 선택 dropdown */}
            <CustomPjtSelect
              options={allProject}
              handleSelectProject={handleSelectProject}
            />
          </div>
          <div className="mt-1 flex h-full w-72">
            {/* 검색창 */}
            <div className="flex h-[80%] w-full rounded-2xl border-[1px] border-gray-400 bg-white pl-2 text-sm focus-within:border-secondary-400 focus-within:ring focus-within:ring-secondary-200">
              <input
                type="text"
                placeholder="에러를 검색하세요!"
                value={searchProject}
                onChange={(e) => setsearchProject(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key == "Enter") handleSearch();
                }}
                className="ml-2 h-full w-full bg-transparent text-sm text-gray-700 outline-none"
              />
              <img
                src="/icons/SearchIcon.png"
                alt="검색"
                className="mr-3 mt-[0.5rem] h-5 w-5 hover:cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="border-1 mt-1 flex h-[90%] w-11/12 items-center justify-center rounded-lg border-primary-100 text-black">
          <ErrorList />
        </div>
      </div>
    </div>
  );
};

export default ErrorListPage;
