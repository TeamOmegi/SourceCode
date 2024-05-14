import { useEffect, useState } from "react";
import { getAllNoteList } from "../../api/allNoteAxios";
import AllNoteContainer from "./AllNoteContainer";

interface AllNote {
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  user: {
    userId: number;
    profileImageUrl: string;
    username: string;
  };
}

const AllNoteList = () => {
  const [allNoteList, setAllNoteList] = useState<AllNote[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    const getAllNotes = async () => {
      const allNotes = await getAllNoteList("");
      console.log(allNotes.notes, "????????????????????");
      setAllNoteList([...allNotes.notes]);
    };
    getAllNotes();
  }, []);

  const handleSearch = async () => {
    const allNoteData = await getAllNoteList(searchKeyword);
    setAllNoteList([...allNoteData.notes]);
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center rounded-xl p-7 text-xl text-black">
      <div className="flex h-[10%] w-full items-center justify-start">
        <div className="ml-5 mt-2 flex h-10 w-1/3 rounded-2xl border-[1px] border-gray-400 bg-white pl-2 text-sm focus-within:border-secondary-400 focus-within:ring focus-within:ring-secondary-200">
          <input
            type="text"
            placeholder="여기에 검색해보세요!"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") handleSearch();
            }}
            className="ml-2 h-full w-full bg-transparent text-sm text-gray-700 outline-none"
          />
          <img
            src="/icons/SearchIcon.png"
            alt="검색"
            className="mr-3 mt-2 h-5 w-5 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="flex h-[90%] w-full items-center justify-center">
        <AllNoteContainer notes={allNoteList} />
      </div>
    </div>
  );
};

export default AllNoteList;
