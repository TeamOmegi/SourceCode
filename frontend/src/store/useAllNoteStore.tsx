import { create } from "zustand";

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

interface Store {
  allNoteList: AllNote[];
  setAllNoteCreate: (note: AllNote) => void;
  setAllNoteList: (notes: AllNote[]) => void;
}

const useALLNoteStore = create<Store>()((set) => ({
  allNoteList: [],
  setAllNoteList: (notes) => set(() => ({ allNoteList: [...notes] })),
  setAllNoteCreate: (note) =>
    set((state) => ({ allNoteList: [note, ...state.allNoteList] })),
}));

export default useALLNoteStore;
