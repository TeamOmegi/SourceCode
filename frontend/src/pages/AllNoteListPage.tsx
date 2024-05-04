import React, { useState, useEffect } from "react";
import AllNoteContainer from "../components/AllNote/AllNoteContainer"; // 파일 경로에 맞게 수정

const AllNoteListPage = () => {
  const [notes, setNotes] = useState([]);

  const getAllNoteList = async () => {
    try {
      const response = await fetch("백엔드API주소");
      const data = await response.json();
      setNotes(data.result);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    getAllNoteList();
  }, []);

  return (
    <div className="bg-default">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-red-200 text-xl text-black">
        <div className="flex h-[20%] w-full bg-yellow-200">모아보기</div>
        <div className="flex h-[80%] w-full flex-col bg-green-200">
          <div className="flex h-[15%] w-full justify-end bg-blue-200">
            검색창
          </div>
          <AllNoteContainer notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default AllNoteListPage;
