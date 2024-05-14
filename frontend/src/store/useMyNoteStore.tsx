import { create } from "zustand";

interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}

interface Store {
  noteList: MyNote[];
  setNoteList: (notes: MyNote[]) => void;
  setNoteCreate: (note: MyNote) => void;
}

const useMyNoteStore = create<Store>()((set) => ({
  noteList: [],
  setNoteList: (notes) => set(() => ({ noteList: [...notes] })),
  setNoteCreate: (note) =>
    set((state) => ({ noteList: [note, ...state.noteList] })),
}));

export default useMyNoteStore;
