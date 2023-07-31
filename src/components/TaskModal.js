import React, { useState } from "react";
import TaskForm from "./TaskForm";

const TaskModal = ({ onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-end justify-end">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-10"
      >
        Add New Task
      </button>

      {isModalOpen && (
        <TaskForm onAddTask={onAddTask} onCloseModal={closeModal} />
      )}
    </div>
  );
};

export default TaskModal;
