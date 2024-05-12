import { create } from "zustand";

interface Store {
  linkSource: number;
  setLinkSource: (source: number) => void;
}

const useLinkStore = create<Store>()((set) => ({
  linkSource: -1,
  setLinkSource: (source) => set(() => ({ linkSource: source })),
}));

export default useLinkStore;
