import React from "react";

interface Note {
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  user: {
    profileImageUrl: string;
    username: string;
  };
}

interface Props {
  notes: Note[];
}

const AllNoteContainer: React.FC<Props> = ({ notes }) => {
  // 임의의 노트 데이터 생성
  const sampleNotes: Note[] = [
    {
      noteId: 1,
      title: "손민기는 보아라",
      content: "손민기 고해림 화이팅",
      createdAt: "2024-05-04",
      isMine: true,
      user: {
        profileImageUrl: "이미지 url",
        username: "사용자1",
      },
    },
    {
      noteId: 2,
      title: "도하이 오화이팅",
      content: "휴우~~ 범죄도시 보고올게~~",
      createdAt: "2024-05-04",
      isMine: false,
      user: {
        profileImageUrl: "이미지 url",
        username: "사용자2",
      },
    },
  ];

  // 임의의 노트 데이터를 사용하도록 설정
  const notesToDisplay: Note[] = notes.length > 0 ? notes : sampleNotes;

  return (
    <div className="flex h-[85%] w-full flex-col bg-blue-300">
      {notesToDisplay.map((note) => (
        <div
          key={note.noteId}
          className="box-border flex items-center justify-between border-b pb-2 pl-3 "
        >
          <div className="box-border flex h-[80%] w-full flex-col justify-start">
            <div className="box-border flex flex-col">
              <h3 className="p-1 text-lg font-semibold">{note.title}</h3>
              <p className="p-2 text-sm">{note.content}</p>
            </div>
            <div className="mb-3 ml-2 mt-2 flex">
              <img
                src={note.user.profileImageUrl}
                alt="프로필 이미지"
                className="h-4 w-4 rounded-full"
              />
              <p className="text-xs text-gray-500">{note.user.username}</p>
              <div className="flex flex-1 justify-end">
                <p className="flex justify-end text-xs text-gray-500">
                  작성 시간: {note.createdAt}
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-8 w-20">
            {note.isMine && (
              <button className="rounded-lg bg-red-400 p-2 text-sm text-white">
                삭제
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllNoteContainer;
