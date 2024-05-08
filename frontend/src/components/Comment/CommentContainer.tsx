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
      <h2 className="text-lg font-bold">댓글</h2>
      <div>
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default CommentContainer;
