import React, { useEffect, useState } from "react";
import { getCommentList } from "./commentAxios";
import CommentList from "./CommentList";

interface Props {
  noteId: number;
}

const CommentContainer = ({ noteId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getCommentList();
  }, [noteId]);

  const getCommentList = async () => {
    setComments(comments);
  };

  return (
    <div>
      <div className="mx-1 flex">
        <h2 className="mr-1 text-lg font-bold">댓글</h2>
        <img
          src="/icons/CommentListIcon.png"
          alt="comment"
          className="m-1 h-5 w-5"
        />
      </div>
      <div className="mx-1 my-1 mb-3 border-b-2">
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default CommentContainer;
