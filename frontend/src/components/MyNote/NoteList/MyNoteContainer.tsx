import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContentParser } from "../../../hooks/useContentParser";
import { noteDelete } from "../../../api/myNoteAxios";
import { useDanger } from "../../../hooks/useComfirm";
import { linkCheck, linkCreate, linkDelete } from "../../../api/noteGraphAxios";
import useLinkStore from "../../../store/useLinkStore";

interface Props {
  type?: string;
  notes: MyNote[];
  selectedTag?: string;
}

interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}

const MyNoteContainer = ({ type, notes, selectedTag }: Props) => {
  const { linkSource } = useLinkStore();
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState<MyNote[]>([]);
  const handleNoteClick = (note: MyNote) => {
    navigate(`/omegi/myNote/${note.noteId}`);
  };

  useEffect(() => {
    if (notes.length === 0) return;
    notes.map((note) => {
      note.content = useContentParser(note.content);
      return note;
    });

    setNoteList([...notes]);
  }, [notes]);

  const handleNoteDelete = async (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    const result = await useDanger({
      title: "노트를 삭제하시겠습니까?",
      fireText: "영구적으로 삭제됩니다.",
    });

    if (result) noteDelete(noteId);
  };

  const handleNoteLink = async (linkTarget: number) => {
    //노트체크
    const checked = await linkCheck(linkSource, linkTarget);
    console.log(checked);
    if (checked) {
      // 이미 연결되어있는 노트입니다.
      // 연결을 끊겠습니까?
      console.log("이미 연결된 노트");
      //linkDelete(linkSource, linkTarget);
    } else {
      // 노트를 연결하시겠습니까?
      console.log("노트 연결할래?");
      //linkCreate({ source: linkSource, target: linkTarget });
    }
  };

  return (
    <div className="mt-5  flex h-full w-full flex-col overflow-y-scroll scrollbar-webkit">
      {noteList.map((note, index) => {
        if (
          selectedTag &&
          selectedTag !== "" &&
          !note.tags.includes(selectedTag)
        )
          return;
        return (
          <div
            key={index}
            className="mb-5 ml-5 mr-5 box-border flex justify-between rounded-xl border-[1px] bg-white py-3 pl-3 shadow-lg hover:cursor-pointer"
            onClick={
              type === "link"
                ? () => {
                    handleNoteLink(note.noteId);
                  }
                : () => {
                    handleNoteClick(note);
                  }
            }
          >
            <div className="box-border flex h-auto w-full flex-col justify-start">
              <div className="box-border flex flex-col">
                <h3 className="p-1 text-lg font-semibold">{note.title}</h3>
                <p className="mr-5 box-border line-clamp-2 text-ellipsis whitespace-normal px-2 text-sm">
                  {note.content}
                </p>
              </div>
              <div className=" ml-2 mt-2 flex items-center justify-between">
                <div>
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className=" mr-3 rounded-3xl bg-green-100 px-4 py-1 text-base font-light text-green-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex pr-5 text-xs text-gray-500">
                  {note.createdAt.split("T")[0]}
                  <img
                    src="/icons/DeleteIcon1.png"
                    alt="삭제 아이콘"
                    className="mx-3 h-4 w-4"
                    onClick={(e) => handleNoteDelete(e, note.noteId)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyNoteContainer;
