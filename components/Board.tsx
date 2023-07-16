"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
function Board() {
  // const [board, getBoard] = useBoardStore((state) => [
  //   state.getBoard,
  //   state.board,
  // ]);
  const getBoard = useBoardStore((state) => state.getBoard);
  const board = useBoardStore((state) => state.board);
  const setBoardState = useBoardStore((state) => state.setBoardState);
  useEffect(() => {
    getBoard();
  }, [getBoard]);
  // console.log("🚀 ~ file: Board.tsx:10 ~ Board ~ board:", board);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (type === "column") {

      // console.log("🚀 ~ file: Board.tsx:21 ~ handleOnDragEnd ~ source:", source)
      const entries = Array.from(board.columns.entries());
      // console.log("🚀 ~ file: Board.tsx:24 ~ handleOnDragEnd ~ entries:", entries)

      const [removed] = entries.splice(source.index, 1);
      // console.log(
      //   "🚀 ~ file: Board.tsx:26 ~ handleOnDragEnd ~ removed:",
      //   removed
      // );
      entries.splice(destination.index, 0, removed);

      const rearrangedColumns = new Map(entries);
      // console.log("🚀 ~ file: Board.tsx:28 ~ handleOnDragEnd ~ rearrangedColumns:", rearrangedColumns)

      console.log(board);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
      console.log(board);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {Array.from(board.columns).map((column, index) => (
              <Column
                index={index}
                key={column[0]}
                id={column[0]}
                todos={column[1].todos}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
