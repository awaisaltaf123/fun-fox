import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../TaskList";

// Mock the react-beautiful-dnd module
jest.mock("react-beautiful-dnd", () => ({
  Droppable: ({ children }) =>
    children({ innerRef: jest.fn(), droppableProps: {} }),
}));

// Mock any additional dependencies if needed
jest.mock("../Task", () => ({ title, description, onDelete, onComplete }) => (
  <div>
    <span>{title}</span>
    <span>{description}</span>
    <button aria-label={`Delete ${title}`} onClick={onDelete}>
      Delete
    </button>
    <input
      type="checkbox"
      aria-label={`Complete ${title}`}
      onChange={onComplete}
    />
  </div>
));

describe("TaskList Component", () => {
  test("renders tasks correctly", () => {
    const tasks = [
      {
        id: "1",
        dragableId: "task-1",
        title: "Task 1",
        description: "Description for Task 1",
        completed: false,
      },
      {
        id: "2",
        dragableId: "task-2",
        title: "Task 2",
        description: "Description for Task 2",
        completed: true,
      },
    ];

    // Mock the onDelete and onComplete functions
    const onDelete = jest.fn();
    const onComplete = jest.fn();

    render(
      <TaskList tasks={tasks} onDelete={onDelete} onComplete={onComplete} />
    );

    // Check if both tasks are rendered correctly
    const task1 = screen.getByText("Task 1");
    const task2 = screen.getByText("Task 2");
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    const tasks = [
      {
        id: "1",
        dragableId: "task-1",
        title: "Task 1",
        description: "Description for Task 1",
        completed: false,
      },
    ];

    const onDelete = jest.fn();
    const onComplete = jest.fn();

    render(
      <TaskList tasks={tasks} onDelete={onDelete} onComplete={onComplete} />
    );

    // Find the delete button and click it
    const deleteButton = screen.getByLabelText("Delete Task 1");
    fireEvent.click(deleteButton);

    // Check if onDelete is called with the correct task ID
    expect(onDelete).toBeCalledWith("1");
  });

  test("calls onComplete when task is marked as completed", () => {
    const tasks = [
      {
        id: "1",
        dragableId: "task-1",
        title: "Task 1",
        description: "Description for Task 1",
        completed: false,
      },
    ];

    const onDelete = jest.fn();
    const onComplete = jest.fn();

    render(
      <TaskList tasks={tasks} onDelete={onDelete} onComplete={onComplete} />
    );

    // Find the checkbox and click it to mark the task as completed
    const checkbox = screen.getByLabelText("Complete Task 1");
    fireEvent.click(checkbox);

    // Check if onComplete is called with the correct task ID
    expect(onComplete).toBeCalledWith("1");
  });
});
