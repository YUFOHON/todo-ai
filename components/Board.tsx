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
  const updateTodoInDB = useBoardStore((state) => state.updateTodoInDB);
  //calculate is the current device is mobile or not
  const isAboveMediumScreens = window.matchMedia("(min-width: 1200px)").matches;
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

      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    const columns = Array.from(board.columns);
    const startColIndedx = columns[Number(source.droppableId)];
    const endColIndedx = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndedx[0],
      todos: startColIndedx[1].todos,
    };
    const endCol: Column = {
      id: endColIndedx[0],
      todos: endColIndedx[1].todos,
    };

    if (!startCol || !endCol) return;

    if (source.index === destination.index && startCol === endCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    // condition 1 : moving todo to same column
    if (startCol.id === endCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(newCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // condition 2 : moving todo to other column
      const finishedTodos = Array.from(endCol.todos);
      finishedTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);

      // set the start column
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id, newCol);

      // set the end column
      const newCol2 = {
        id: endCol.id,
        todos: finishedTodos,
      };
      newColumns.set(endCol.id, newCol2);

      // Update database
      updateTodoInDB(todoMoved, endCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId="board"
        direction={isAboveMediumScreens ? "horizontal" : "vertical"}
        type="column"
      >
      
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
function useMediaQuery(arg0: string) {
  throw new Error("Function not implemented.");
}
