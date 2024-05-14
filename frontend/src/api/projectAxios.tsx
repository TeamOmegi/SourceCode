import axios from "axios";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

// 다이어그램 정보 가져오기
export const getDiagram = async (projectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/projects/${projectId}/diagram`,
    );
    return response.data.response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};

// 에러 한눈에 보기
export const getErrorSolved = async (errorId: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/errors/${errorId}/solved`);
    return response;
  } catch (error) {
    console.error(error, "Fail getDiagram");
  }
};
