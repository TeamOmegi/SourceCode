import axios from "axios";

const BASE_URL = "";

// AllNoteList
interface User {
  profileImageUrl: string;
  username: string;
}

interface Note {
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  user: User;
}

interface ApiResponse {
  status: number;
  message: string;
  result: Note[];
}

export const getAllNoteList = async (keyword: string): Promise<Note[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${BASE_URL}/allNote/others?keyword=${keyword}`,
    );
    if (response.data.status === 200) {
      return response.data.result;
    } else {
      throw new Error("노트 목록 불러오기 실패");
    }
  } catch (error) {
    console.error(error, "Fail getAllNoteList");
    throw error;
  }
};

// AllNoteDetail
interface ErrorInfo {
  errorId: number;
  errorType: string;
  summary: string;
  solved: boolean;
}

interface NoteDetail {
  user: User;
  noteId: number;
  title: string;
  content: string;
  type: "ERROR" | "NORMAL";
  backlinkCount: number;
  createdAt: string;
  error: ErrorInfo;
}

interface NoteDetailApiResponse {
  status: number;
  message: string;
  result: NoteDetail;
}
export const getAllNoteDetail = async (noteId: number): Promise<NoteDetail> => {
  try {
    const response = await axios.get<NoteDetailApiResponse>(
      `${BASE_URL}/allNote/${noteId}`,
    );
    if (response.data.status === 200) {
      return response.data.result;
    } else {
      throw new Error("노트 상세 정보 불러오기 실패");
    }
  } catch (error) {
    console.error(error, "Fail getAllNoteDetail");
    throw error;
  }
};
