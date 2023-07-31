import { Draggable } from "react-beautiful-dnd";

const Task = ({
  dragableId,
  index,
  title,
  description,
  completed,
  onDelete,
  onComplete,
}) => {
  return (
    <Draggable key={dragableId} draggableId={dragableId} index={index}>
      {(provided) => (
        <div
          className="rounded-md shadow-sm my-4 px-4 py-2 bg-gray-300 mx-5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-500" style={{ whiteSpace: "pre-wrap" }}>
            {description}
          </p>
          <div className="flex justify-end">
            <button onClick={onDelete} className="text-red-500 px-4">
              Delete
            </button>
            <button
              onClick={onComplete}
              className={completed ? "text-green-500" : "text-yellow-500"}
            >
              {completed ? "Complete" : "Pending"}
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
