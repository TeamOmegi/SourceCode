import { create } from "zustand";

interface Error {
  errorId: number;
  serviceId: number;
  projectId: number;
  solved: boolean;
  type: string;
  time: string;
}

interface Store {
  errorList: Error[];
  isNewError: boolean;
  setErrorList: (error: Error) => void;
  setIsNewError: (isError: boolean) => void;
}

const useErrorStore = create<Store>()((set) => ({
  errorList: [],
  isNewError: false,
  setErrorList: (error) =>
    set((state) => ({ errorList: [error, ...state.errorList] })),
  setIsNewError: (isError) => set(() => ({ isNewError: isError })),
}));

export default useErrorStore;
