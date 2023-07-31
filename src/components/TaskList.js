import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const TaskList = ({ tasks, onDelete, onComplete }) => {
  return (
    <Droppable
      droppableId={tasks.length > 0 ? tasks[0].dragableId : "droppable"}
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              index={index}
              dragableId={task.dragableId}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onDelete={() => onDelete(task.id)}
              onComplete={() => onComplete(task.id)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
