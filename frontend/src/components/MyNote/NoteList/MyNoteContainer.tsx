import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContentParser } from "../../../hooks/useContentParser";
import { noteDelete } from "../../../api/myNoteAxios";
import { useDanger, useQuestion, useWarnning } from "../../../hooks/useComfirm";
import { linkCheck, linkCreate, linkDelete } from "../../../api/noteGraphAxios";
import useLinkStore from "../../../store/useLinkStore";
import { useError } from "../../../hooks/useAlert";
import useEditorStore from "../../../store/useEditorStore";

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
  const { setShowNote, setNoteType } = useEditorStore();
  const { linkTarget } = useLinkStore();
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

  const handleNoteLink = async (linkeSource: number) => {
    if (linkTarget === linkeSource) {
      useError({
        title: "Link Error",
        text: "같은 노트는 연결할 수 없습니다.",
      });
      return;
    }
    //노트체크
    const checked1 = await linkCheck(linkeSource, linkTarget);
    const checked2 = await linkCheck(linkTarget, linkeSource);
    console.log(checked1, checked2, "연결된링크");
    if (checked1 || checked2) {
      // 이미 연결된 노트입니다.
      const result = await useWarnning({
        title: "Link Delete",
        fireText: "Note 연결을 끊겠습니까?",
        resultText: "Note가 연결을 끊었습니다.",
      });
      if (result) {
        if (checked1) {
          linkDelete(linkeSource, linkTarget);
        }
        if (checked2) {
          linkDelete(linkTarget, linkeSource);
        }
      } else return;
    } else {
      const result = await useQuestion({
        title: "Link Create",
        fireText: "Note를 연결하시겠습니까?",
        resultText: "Note가 연결되었습니다.",
      });
      if (result) {
        linkCreate(linkeSource, linkTarget);
      } else return;
    }
    setShowNote();
    setTimeout(() => {
      setNoteType("create");
    }, 1000);
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
            className="mb-5 ml-5 mr-5 box-border flex w-[97%] flex-nowrap justify-between overflow-visible rounded-xl border-[1px] bg-white py-3 pl-3 shadow-lg hover:cursor-pointer"
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
