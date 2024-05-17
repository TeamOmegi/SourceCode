import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

interface Project {
  projectName: string;
  services: Service[];
}

interface Service {
  serviceTypeId: number;
  serviceName: string;
}

interface TokenName {
  name: string;
}

// 다이어그램 정보 가져오기
export const getDiagram = async (projectId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}/diagram`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 에러 한눈에 보기
export const getErrorSolved = async (errorId: number): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/errors/${errorId}/solved`);
    return response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 프로젝트 생성하기
export const projectCreate = async (projectData: Project) => {
  try {
    const response = await axiosInstance.post(`/projects`, projectData);
    console.log(response, "Success PjtCreate");
  } catch (error) {
    console.error(error, "Fail PjtCreate");
  }
};

// 프로젝트 이름가져오기
export const getProjectNames = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 프로젝트내 서비스 종류 가져오기
export const getServices = async (projectId: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 프로젝트 생성시 서비스 타입종류 가져오기
export const getServicesType = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/services/supported-types`);
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 프로젝트 이름가져오기
export const getServiceTokens = async (
  projectId: number,
  serviceId: number,
  nameData: TokenName,
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/projects/${projectId}/services/${serviceId}/tokens`,
      nameData,
    );
    return response.data;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};
