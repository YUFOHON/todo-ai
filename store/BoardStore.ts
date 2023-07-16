import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupByColumn";
// import { Board, Column, TypedColumn } from '../types/Board'
interface BoardStore {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => {
    set({ board });
  },
}));
