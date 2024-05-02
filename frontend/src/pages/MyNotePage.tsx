import NoteGraph from "../components/MyNote/NoteGraph/NoteGraph";

const MyNotePage = () => {
  return (
    <div className="bg-default">
      <div className="flex h-1/6 w-full bg-blue-300 text-5xl">내 노트</div>
      <div className="flex h-5/6 w-full items-center justify-center rounded-xl">
        <div className="flex h-5/6 w-11/12 items-center justify-center bg-gray-500 text-black">
          <NoteGraph />
        </div>
      </div>
    </div>
  );
};

export default MyNotePage;
