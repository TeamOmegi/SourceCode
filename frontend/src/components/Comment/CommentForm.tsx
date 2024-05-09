import React, { useState } from "react";

interface Props {
  onSubmit: (content: string) => void;
}

const CommentForm = ({ onSubmit }: Props) => {
  const [content, setContent] = useState("");
  const [isContentEmpty, setIsContentEmpty] = useState(true);

  const handleSubmit = () => {
    if (!content) return;
    onSubmit(content);
    setContent("");
    setIsContentEmpty(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsContentEmpty(e.target.value.trim() === "");
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex h-40 w-full flex-col rounded-lg border-none bg-white focus:outline-none">
          <div className="flex h-[25%] w-auto items-center border-b-[1px] px-2 text-base">
            작성자
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 작성해주세요..."
            className="h-[60%] w-full p-2 placeholder:text-gray-400 focus:outline-none"
            style={{ resize: "none" }}
          />
          <div className="m-3 flex h-[15%] justify-end">
            <button
              type="submit"
              className={`h-8 w-12 cursor-pointer select-none items-center justify-center rounded-xl p-2 text-sm ${isContentEmpty ? " bg-gray-100 text-[#868E96]" : "bg-primary-200 text-white"} `}
            >
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
