import axios from "axios";

const BASE_URL = "";

interface Comment {
  commentId: number;
  content: string;
  writer: {
    profileImageUrl: string;
    userId: number;
    username: string;
  };
}

export const getCommentList = async (noteId: number): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/notes/${noteId}/comments`);
    const data: { result: { comments: Comment[] } } = response.data;
    return data.result.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// 댓글 작성
export const createComment = async (noteId: number, content: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes/${noteId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

// 댓글 수정
export const updateComment = async (
  noteId: number,
  commentId: number,
  content: string,
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notes/${noteId}/comments/${commentId}`,
      {
        content,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
  }
};

// 댓글 삭제
export const deleteComment = async (noteId: number, commentId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/notes/${noteId}/comments/${commentId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
