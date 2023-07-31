import React, { useState, useEffect } from "react";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchUsersTasks, fetchUsersGroup } from "./api/taskManagement";
import { notifySuccess } from "./Helper/notifyMessages";
import { filterGroupAndExtractIds } from "./Helper/filterData";
import Spinner from "./Helper/Spinner/Spinner";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchUsersGroup(), fetchUsersTasks()])
      .then(([groupData, taskData]) => {
        const groupId = process.env.REACT_APP_GROUP_ID;
        const filteredTasks = filterGroupAndExtractIds(
          groupData,
          taskData,
          groupId
        );
        setTasks(filteredTasks);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error when fetching Data!!", error);
      });
  }, []);

  const handleAddTask = (newTask) => {
    const newTaskWithId = {
      ...newTask,
      id: Date.now(),
      completed: false,
      dragableId: Math.random().toString(),
    };
    setTasks([...tasks, newTaskWithId]);
    notifySuccess("Item added successfully!");
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    notifySuccess("Item Deleted!");
  };

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    notifySuccess("Item status Changed!!");
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <h1 className="text-xl font-bold pb-10 pt-5 ml-2 flex items-center justify-center">
        Task Management System
      </h1>
      <TaskModal onAddTask={handleAddTask} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />
      </DragDropContext>
    </div>
  );
};

export default App;
