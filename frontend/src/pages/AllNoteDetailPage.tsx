import React, { useState, useEffect } from "react";
import CommentContainer from "../components/Comment/CommentContainer";
import CommentForm from "../components/Comment/CommentForm";
import { createComment } from "../api/commentAxios";
import { useParams } from "react-router-dom";
import { getAllNoteDetail } from "../api/allNoteAxios";
import CommentList from "../components/Comment/CommentList";

interface User {
  userId?: number;
  profileImageUrl: string;
  username: string;
}

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

const AllNoteDetailPage = () => {
  const noteId = parseInt(useParams().noteId || "-1");
  const userId = parseInt(useParams().userId || "-1");
  console.log("userId?!!??!?!?!?!?", userId);
  const [note, setNote] = useState<NoteDetail | undefined>();

  const getNoteDetail = async (noteId: number) => {
    try {
      const response = await getAllNoteDetail(noteId);
      console.log("노트 상세 정보:", response);
      setNote({ ...response });
    } catch (error) {
      console.error(
        "노트 상세 정보를 불러오는 중 오류가 발생했습니다????????",
        error,
      );
    }
  };

  useEffect(() => {
    getNoteDetail(noteId);
    console.log("note?!??", note);
  }, [noteId]);

  const handleCommentSubmit = async (content: string) => {
    try {
      await createComment(noteId, content);
      console.log("댓글 작성:", content);
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col rounded-xl p-10 text-black">
        <div className="flex h-[20%] w-full flex-col  border-b-2 ">
          <div className="ml-2 mt-10 flex items-center justify-start text-3xl font-bold">
            <h2>{note?.title}</h2>
          </div>
          <div className="text-md mr-5 box-border flex justify-end p-2">
            <p className="mr-5">{note?.user.username}</p>
            <p className="mr-2">{note?.createdAt}</p>
          </div>
        </div>
        <hr />
        <div className="box-border flex h-auto w-full flex-col border-b p-7">
          {/* <p>{note?.content}</p> */}
          <br />
          <div>
            {note && note.type === "ERROR" ? (
              <>
                <p>에러 요약: {note.error.summary}</p>
                <p>
                  해결 여부: {note.error.solved ? "해결됨" : "해결되지 않음"}
                </p>
              </>
            ) : (
              <p>에러가 없습니다.</p>
            )}
          </div>
        </div>
        <hr />
        <div className="box-border flex h-auto w-full p-3">
          <img
            src="/public/icons/BacklinkIcon.png"
            alt="백링크"
            className="h-5 w-5"
          />
          <p className="ml-1 text-base">{note?.backlinkCount}개</p>
        </div>
        <div className="box-border flex h-auto w-full flex-col p-3">
          <CommentContainer noteId={noteId} currentUserId={userId} />
        </div>
      </div>
    </div>
  );
};

export default AllNoteDetailPage;
