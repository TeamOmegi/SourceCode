import { useState, useEffect } from "react";
import ErrorList from "../components/Error/ErrorList";
import { getProjectList } from "../api/errorAxios";
import CustomPjtSelect from "../components/Error/CustomPjtSelect";

interface Project {
  projectId: number;
  name: string;
}

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
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [errorList, setErrorList] = useState<Error[]>([]);
  const [allProject, setAllProject] = useState<string[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectData = await getProjectList();
        setAllProject(projectData.map((project: Project) => project.name));
        if (projectData.length > 0) {
          const firstProjectName = projectData[0].name;
          console.log("!!!!!!!!!!!!!firstProjectName", firstProjectName);
          setSelectedProject(firstProjectName);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getProjects();
  }, []);

  const handleSelectProject = async (project: string) => {
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
              selectedOption={selectedProject}
              handleSelectProject={handleSelectProject}
            />
          </div>
        </div>
        <div className="border-1 mt-1 flex h-[90%] w-11/12 items-center justify-center overflow-y-scroll rounded-lg border-primary-100 text-black scrollbar-webkit">
          <ErrorList selectedProject={selectedProject} />
        </div>
      </div>
    </div>
  );
};

export default ErrorListPage;
