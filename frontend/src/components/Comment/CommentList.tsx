import React from "react";

interface Comment {
  commentId: number;
  content: string;
  writer: {
    profileImageUrl: string;
    userId: number;
    username: string;
  };
}

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <div>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId}>
              <div>
                <img src={comment.writer.profileImageUrl} alt="Profile" />
                <span>{comment.writer.username}</span>
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>댓글 없음</p>
      )}
    </div>
  );
};

export default CommentList;
