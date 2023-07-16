import PlusCircleIcon from "@heroicons/react/24/solid/PlusCircleIcon";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogess: "In Progess",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {
            // render draggable
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <div
                  className={` gap-4 pb-2 p-2 rounded-2xl shadow-sm ${
                    snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                  } `}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="flex justify-between font-bold text-xl">
                    {idToColumnText[id]}

                    <span className="text-gray-500 bg-purple-300 rounded-full px-2 py-1 text-sm">
                      {todos.length}
                    </span>
                  </h2>

                  <div className="space-y-2 my-2">
                    {todos.map((todo, index) => (
                      <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                      >
                        {
                           (provided)=>(
                            <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            />
                           )

                        }
                      </Draggable>
                    ))}
                    {provided.placeholder}

                        <div className="text-end">
                          <button>
                          <PlusCircleIcon className="h-10 w-10 text-purple-500 hover:text-purple-600"/>

                          </button>
                        </div>

                  </div>
                </div>
              )}
            </Droppable>
          }
        </div>
      )}
    </Draggable>
  );
}

export default Column;
