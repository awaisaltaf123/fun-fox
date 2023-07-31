import React, { useState, useRef, useEffect } from "react";

const TaskForm = ({ onAddTask, onCloseModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const descriptionRef = useRef(null);
  const modalRef = useRef(null);

  const resetTextareaRows = () => {
    const textarea = descriptionRef.current;
    textarea.rows = 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
    setTitleError(false);
    resetTextareaRows();
    onCloseModal();
  };

  const handleDescriptionChange = () => {
    const textarea = descriptionRef.current;
    const textareaLineHeight = 24;
    const minRows = 1;
    textarea.rows = minRows;

    const currentRows = Math.ceil(textarea.scrollHeight / textareaLineHeight);
    textarea.rows = currentRows;
    setDescription(textarea.value);
  };

  // Close the modal when clicking outside it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCloseModal();
    }
  };

  // Add event listener when the modal is opened
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        data-testid="modal"
        ref={modalRef}
        className="bg-white p-8 rounded-lg w-full max-w-md"
      >
        <div className="flex justify-end">
          {/* Cross icon */}
          <button
            onClick={onCloseModal}
            className="text-gray-500 hover:text-red-500 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <h2 className="text-2xl mb-4">Add New Task</h2>

        <div className="overflow-y-auto max-h-60">
          {" "}
          {/* Add scrollable area */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`border border-gray-300 rounded-md px-4 py-2 w-full ${
                  titleError ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <textarea
                ref={descriptionRef}
                placeholder="Task Description"
                value={description}
                onChange={handleDescriptionChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded-md w-full"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
