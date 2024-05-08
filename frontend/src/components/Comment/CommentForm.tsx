import React, { useState } from "react";

interface Props {
  onSubmit: (content: string) => void;
}

const CommentForm = ({ onSubmit }: Props) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === "") return;
    onSubmit(content);
    setContent("");
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex h-full w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 작성해주세요..."
            className="h-18 w-full rounded-md border-none p-2 focus:outline-none"
            style={{ resize: "none" }}
          />
          <button
            type="submit"
            className="ml-2 rounded-md bg-blue-500 p-2 text-white"
          >
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
