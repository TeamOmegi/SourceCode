import React, { useState, useEffect } from "react";
import AllNoteContainer from "../components/AllNote/AllNoteContainer";

const AllNoteListPage = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = async () => {
    try {
      const response = await fetch(`백엔드API주소/${searchTerm}`);
      const data = await response.json();
      setNotes(data.result);
    } catch (error) {
      console.error("데이터를 검색하는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col items-center justify-center rounded-xl p-5 text-xl text-black">
        <div className="flex h-[20%] w-full items-center justify-center">
          모아보기
        </div>
        <div className="flex h-[80%] w-full flex-col">
          <div className="flex h-[10%] w-full justify-end">
            <div className=" mr-5 mt-2 flex h-8 w-1/3 rounded-2xl border-[1px] border-gray-400 pl-2 text-sm">
              <input
                type="text"
                placeholder="여기에 검색해보세요!"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 h-full w-full bg-transparent text-sm text-gray-700 outline-none"
              />
              <img
                src="../public/icons/SearchIcon.png"
                alt="검색"
                className="mr-2 mt-2 h-4 w-4 cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          </div>
          <AllNoteContainer notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default AllNoteListPage;
