import { useState, useEffect } from "react";
import {
  getProjectNames,
  getServiceTokens,
  getServices,
  getServicesType,
  projectCreate,
} from "../api/projectAxios";
import ProjectSelect from "../components/Setting/ProjectSelect";
import ServiceTypeSelect from "../components/Setting/ServiceTypeSelect";
import { useError } from "../hooks/useAlert";
import { useQuestion } from "../hooks/useComfirm";

interface ProjectName {
  projectId: number;
  name: string;
}

interface ServiceName {
  serviceId: number;
  serviceName: string;
}

interface ServiceType {
  serviceTypeId: number;
  serviceTypeName: string;
}

const SettingPage = () => {
  // select
  const [pjtNames, setPjtNames] = useState<ProjectName[]>([]);
  const [serviceType, setServiceType] = useState<ServiceType[]>([]);

  const [selectedProject, setSelectedProject] = useState<number>(-1);
  const [services, setServices] = useState<ServiceName[]>([]);

  // 프로젝트 생성 data
  const [projectName, setProjectName] = useState<string>("");
  const [serviceNames, setServiceNames] = useState<string[]>([""]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([1]);

  // 토큰
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getPjtNames = async () => {
      const nameData = await getProjectNames();
      const typeData = await getServicesType();
      setPjtNames([...nameData.projects]);
      setServiceType([...typeData.supportedTypes]);
    };
    getPjtNames();
  }, []);

  useEffect(() => {
    if (selectedProject == -1) return;
    const getService = async () => {
      const serviceData = await getServices(selectedProject);
      setServices([...serviceData.services]);
    };
    getService();
  }, [selectedProject]);

  // 프로젝트 등록 관련

  const createServiceNamesArray = () => {
    return serviceNames.map((name, index) => ({
      serviceTypeId: selectedTypes[index],
      serviceName: name,
    }));
  };

  const handleProjectCreate = async () => {
    if (projectName == "") {
      useError({
        title: "Error",
        text: "프로젝트 이름을 입력해주세요.",
      });
      return;
    } else {
      for (let i = 0; i < serviceNames.length; i++) {
        if (serviceNames[i] === "") {
          useError({
            title: "Error",
            text: "서비스 이름을 입력해주세요.",
          });
          return;
        }
      }

      const result = await useQuestion({
        title: "Project Create",
        fireText: "프로젝트를 생성하시겠습니까?",
        resultText: "프로젝트가 생성되었습니다.",
      });

      if (result) {
        const projectData = {
          projectName: projectName,
          services: createServiceNamesArray(),
        };

        await projectCreate(projectData);
        const nameData = await getProjectNames();

        setPjtNames([...nameData.projects]);
        setProjectName("");
        setSelectedTypes([1]);
        setServiceNames([""]);
      } else return;
    }
  };

  const handleServiceCreate = () => {
    setServiceNames([...serviceNames, ""]);
    setSelectedTypes([...selectedTypes, 1]);
  };

  const handleServiceDelete = (index: number) => {
    const newServiceNames = serviceNames.filter((_, i) => i !== index);
    setServiceNames(newServiceNames);

    const newSelectedTypes = selectedTypes.filter((_, i) => i !== index);
    setSelectedTypes(newSelectedTypes);
  };

  // 프로젝트 셀렉트
  const handleSelectProject = async (projectId: number) => {
    setSelectedProject(projectId);
  };

  // 프로젝트 이름 인풋
  const handleChangeProjectName = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setProjectName(e.target.value);
  };

  // 서비스 이름 인풋
  const handleChangeServiceName = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    index: number,
  ) => {
    const newInputNames = serviceNames.map((name, i) => {
      if (i == index) return e.target.value;
      else return name;
    });
    setServiceNames(newInputNames);
    console.log(newInputNames);
  };

  // 서비스 타입 셀렉트
  const handleSelectType = async (index: number, typeId: number) => {
    setSelectedTypes((prevSelectedTypes) => {
      const newSelectedTypes = [...prevSelectedTypes];
      newSelectedTypes[index] = typeId;
      return newSelectedTypes;
    });
  };

  // 서비스 토근가져오기
  const handleServiceToken = async (serviceId: number, serviceName: string) => {
    const tokenName = {
      name: serviceName,
    };
    const token = await getServiceTokens(selectedProject, serviceId, tokenName);
    setToken(token.serviceToken);
  };
  return (
    <div className="bg-default flex items-center justify-center">
      <div className=" h-1/2 w-2/5">
        <div className="flex flex-col ">
          <input
            className="box-border h-10 w-72 rounded-lg border-2 px-3"
            placeholder="ProjectName"
            onBlur={(e) => {
              handleChangeProjectName(e);
            }}
          />
          {serviceNames.map((_, index) => (
            <div className="flex items-center ">
              <input
                key={index}
                className="box-border flex h-10 w-72 rounded-lg border-2 px-3 text-gray-700 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
                placeholder={`${index + 1}.  ServiceName`}
                onBlur={(e) => {
                  handleChangeServiceName(e, index);
                }}
              />
              <ServiceTypeSelect
                options={serviceType}
                index={index}
                handleSelectType={handleSelectType}
              />
              {index != 0 && index == serviceNames.length - 1 && (
                <img
                  className="ml-3 h-6 w-6 opacity-45 hover:cursor-pointer hover:opacity-100"
                  onClick={() => {
                    handleServiceDelete(index);
                  }}
                  src="/icons/MinusIcon.png"
                />
              )}
            </div>
          ))}
          <div
            className="mt-2 flex h-10 w-72 items-center justify-center hover:cursor-pointer"
            onClick={handleServiceCreate}
          >
            <img
              className="ml-3 h-6 w-6 opacity-45 hover:cursor-pointer hover:opacity-100"
              src="/icons/HoverPlusIcon.png"
            />
          </div>
        </div>
        <div
          className="h-10 w-40 rounded-lg bg-gray-400 hover:cursor-pointer "
          onClick={handleProjectCreate}
        >
          프로젝트 생성
        </div>
      </div>
      <div className="h-1/2 w-1/5">
        <ProjectSelect
          options={pjtNames}
          handleSelectProject={handleSelectProject}
        />
        {services.map((service) => {
          return (
            <div className="flex items-center">
              <div className="my-2 flex h-10 w-40 rounded-lg bg-gray-400">
                <div>{service.serviceName}</div>
              </div>
              <div
                className="ml-5 h-5 w-5 bg-black text-white"
                onClick={() =>
                  handleServiceToken(service.serviceId, service.serviceName)
                }
              >
                t
              </div>
            </div>
          );
        })}
        <div className="w-40 ">{token !== "" && token}</div>
      </div>
    </div>
  );
};

export default SettingPage;
