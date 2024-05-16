import React, { useState } from "react";
import NoteGraph from "../components/MyNote/NoteGraph/NoteGraph";
import NoteList from "../components/MyNote/NoteList/NoteList";
import ToggleContainer from "../components/MyNote/NoteList/ToggleContainer";

const MyNotePage = () => {
  const [viewType, setViewType] = useState("list");

  return (
    <div className="bg-default">
      <div className="flex h-1/6 w-full justify-between rounded-xl bg-blue-300">
        <div className="m-5 flex items-center justify-center text-2xl font-bold">
          내 노트 📒
        </div>
        <div className="box-border flex items-end px-5 py-1">
          <ToggleContainer setViewType={setViewType} viewType={viewType} />
        </div>
      </div>
      <div className="flex h-5/6 w-full items-center justify-center rounded-xl">
        {viewType === "list" ? (
          <div className="border-1 flex h-full w-11/12 items-center justify-center rounded-lg border-primary-100 text-black">
            <NoteList />
          </div>
        ) : (
          <div className="border-1   flex h-full w-full items-center justify-center rounded-lg border-primary-100 bg-main-100 text-white">
            <NoteGraph />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNotePage;
