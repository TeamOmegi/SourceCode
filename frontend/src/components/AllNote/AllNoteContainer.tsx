import React from "react";
import { useNavigate } from "react-router-dom";

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

const AllNoteContainer = ({ notes }: Props) => {
  const navigate = useNavigate();
  // 임의의 노트 데이터 생성
  const sampleNotes: Note[] = [
    {
      noteId: 1,
      title: "손민기는 보아라",
      content: "손민기 고해림 화이팅",
      createdAt: "2024-05-04",
      isMine: false,
      user: {
        profileImageUrl: "이미지 url",
        username: "사용자1",
      },
    },
    {
      noteId: 2,
      title: "도하이 오화이팅",
      content:
        "휴우~~ 범죄도시 보고올게~~ㅁㄴ이ㅏ럼인;ㅏ러민ㅇ라ㅓ as;dkfa;ldsfk;alsdkf;lqwkerpoksa;ldkfjpqjfklnlk미ㅏㅇ너림ㅇ나ㅓ림ㄴ아ㅓ림;ㅏㅇ널;ㅣ바젇게ㅓㅇ리마너리마ㅓㄴㅇ리마ㅓㅇㄴ리ㅏ먼ㅇ리ㅏㅓㅂㅈ대ㅓ갠우리ㅏㅟ;ㅁ런ㅁ애ㅣㅏ러먼우치ㅏㅜ티ㅏ;ㅡㅜㅁ니;아ㅓ렙저덱'ㅐ버ㅔㅈ라이너므;ㅣㅓ리먼ㅇ'ㄹ;ㅂ저ㅐㅔ다거;안렁ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ미ㅏㄴㅇㄹ;'ㅣ",
      createdAt: "2024-05-04",
      isMine: true,
      user: {
        profileImageUrl: "이미지 url",
        username: "사용자2",
      },
    },
  ];

  // 임의의 노트 데이터를 사용하도록 설정
  const notesToDisplay: Note[] = notes.length > 0 ? notes : sampleNotes;

  // 노트를 클릭했을 때 상세 페이지로 이동하는 함수
  const handleNoteClick = (note: Note) => {
    if (note.isMine) {
      navigate(`/omegi/myNote/${note.noteId}`); // MyNoteDetail 페이지로 이동
    } else {
      navigate(`/omegi/allNote/${note.noteId}`); // AllNoteDetail 페이지로 이동
    }
  };

  // content를 잘라내어 특정 길이 이상인 경우 생략하는 함수
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="flex h-[85%] w-full flex-col">
      {notesToDisplay.map((note) => (
        <div
          key={note.noteId}
          className="mb-5 ml-5 mr-5 box-border flex items-center justify-between rounded-xl border-[1px] border-gray-300 bg-secondary-50 pb-2 pl-3"
          onClick={() => handleNoteClick(note)}
          style={{ cursor: "pointer" }}
        >
          <div className="box-border flex h-[80%] w-full flex-col justify-start">
            <div className="box-border flex flex-col">
              <h3 className="p-1 text-lg font-semibold">{note.title}</h3>
              <p className="p-2 text-sm">
                {truncateContent(note.content, 100)}
              </p>
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
