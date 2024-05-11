import axios from "axios";

const BASE_URL = "http://k10a308.p.ssafy.io:8081";

interface ErrorItem {
  errorId: number;
  isSolved: boolean;
  errorType: string;
  project: string;
  service: string;
  time: string;
  pastNoteCount: number;
}

// 에러 리스트 가져오기
export const getErrorList = async (project: string, service: string) => {
  try {
    let params = {};
    if (project.trim() !== "") {
      params = { project: project, service: service };
    }
    const response = await axios.get("/errors", {
      params,
    });
    return response.data.result;
  } catch (error) {
    console.error("Error getErrorList", error);
  }
};

export const getAllMyNoteData = async (
  keyword: string,
  project: string,
  service: string,
): Promise<any> => {
  try {
    let params: any = { keyword: keyword };

    // 프로젝트 및 서비스 이름이 주어진 경우에만 params에 추가합니다.
    if (project.trim() !== "") {
      params.project = project;
    }

    if (service.trim() !== "") {
      params.service = service;
    }

    const response = await axios.get(`${BASE_URL}/notes/list`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error, "Fail getNoteData");
    throw error;
  }
};

// 에러 상세 조회
interface ErrorDetail {
  traces: string[]; // 추후 수정
  summary: string;
  log: string;
  noteId: number; // 작성된 노트가 없는 경우 -1
}

interface ErrorDetailResponse {
  status: number;
  message: string;
  result: ErrorDetail;
}

export const getErrorDetail = async (errorId: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/errors/${errorId}`);
    return response.data.result;
  } catch (error) {
    console.error(error, "Fail getErrorDetail");
  }
};
