import React, { useState } from "react";
import ErrorList from "../components/Error/ErrorList/ErrorList";

interface Project {
  id: number;
  name: string;
}

const DashBoardPage = () => {
  const [selectedProject, setSelectedProject] = useState<number>(1);

  // Sample project data
  const projects: Project[] = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ];

  const handleProjectChange = (projectId: number) => {
    setSelectedProject(projectId);
  };
  return (
    <div className="bg-default">
      <div className="flex h-full w-full items-center justify-center text-xl text-black">
        <div className="box-border h-full w-full rounded-xl bg-secondary-50 p-3">
          <div className="relative box-border flex h-[10%] w-full p-3">
            <div className="relative flex h-full w-1/3">
              <select
                value={selectedProject}
                onChange={(e) => handleProjectChange(Number(e.target.value))}
                className="w-full appearance-none rounded-xl border-gray-400 bg-white px-4 py-2 pr-8 shadow hover:border-gray-500"
              >
                <option value="" disabled>
                  프로젝트 선택
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <img
                className="pointer-events-none absolute inset-y-0 right-0 mr-3 mt-3 flex h-5 w-5"
                src="/icons/DropdownIcon.png"
                alt="DropdownIcon"
              />
            </div>
          </div>
          <div className="flex h-[50%] w-full ">
            <div className="m-1 flex h-full w-2/5 flex-col rounded-xl">
              {/* 나의 에러 한눈에 보기 */}
              <div className="mt-1 flex h-1/2 w-full flex-col rounded-xl bg-blue-200 p-1">
                <div className="ml-2 mt-2 flex h-2/6 w-full text-base font-bold">
                  나의 에러 한눈에 보기
                </div>
                <div className="m-1 flex h-4/6">
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">해결 에러</div>
                    <div className="text-base">10</div>
                  </div>
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">미해결 에러</div>
                    <div className="text-base">10</div>
                  </div>
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">작성한 노트수</div>
                    <div className="text-base">10</div>
                  </div>
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">최근 에러 발생일</div>
                    <div className="text-base">10</div>
                  </div>
                </div>
              </div>
              {/* 나의 노트 한눈에 보기 */}
              <div className="mt-1 flex h-1/2 w-full flex-col rounded-xl bg-green-300 p-1">
                <div className="ml-2 mt-2 flex h-2/6 w-full text-base font-bold">
                  나의 노트 한눈에 보기
                </div>
                <div className="m-1 mb-3 flex h-4/6">
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">에러 노트</div>
                    <div className="text-base">10</div>
                  </div>
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">기본 노트</div>
                    <div className="text-base">10</div>
                  </div>
                  <div className="mr-1 h-full w-1/4 flex-col rounded-xl bg-slate-100 p-2">
                    <img
                      className="h-12 w-12"
                      src="/icons/TempIcon.png"
                      alt="TempIcon"
                    />
                    <div className="mt-2 text-sm">하암..</div>
                    <div className="text-base">10</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 로그 트리 */}
            <div className="m-1 flex h-full w-3/5 flex-col rounded-xl bg-red-200">
              <div className="ml-2 mt-2 h-[15%] w-full text-base font-bold">
                로그 트리
              </div>
              <div className="flex h-[85%] w-full p-2">
                <img
                  className="h-full w-full rounded-xl bg-purple-200"
                  src="/LogTemp.png"
                  alt="LogTemp"
                />
              </div>
            </div>
          </div>

          <div className="flex h-[40%] w-full rounded-xl p-2">
            <div className="box-border flex h-full w-full flex-col rounded-xl bg-yellow-300 p-3">
              <div className="h-1/6 w-full text-base font-bold">
                에러 리스트
              </div>
              <div className="h-5/6 w-full">
                <ErrorList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
