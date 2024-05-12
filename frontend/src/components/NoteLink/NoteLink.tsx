import { useEffect, useState } from "react";
import MyNoteContainer from "../MyNote/NoteList/MyNoteContainer";
import { getAllMyNoteData } from "../../api/myNoteAxios";
interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}
const NoteLink = () => {
  const [noteList, setNoteList] = useState<MyNote[]>([]);

  useEffect(() => {
    const getData = async () => {
      const allMyNoteData = await getAllMyNoteData("");
      setNoteList(allMyNoteData.response.notes);
    };

    getData();
  }, []);

  return (
    <div>
      <div></div>
      <div className="scrollBar h-[70%] w-[90%] overflow-y-scroll">
        <MyNoteContainer notes={noteList} type="link" />
      </div>
    </div>
  );
};

export default NoteLink;
