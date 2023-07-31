import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Task from "../Task";

// Mock react-beautiful-dnd dependencies
jest.mock("react-beautiful-dnd", () => ({
  Draggable: ({ children }) => children({}),
}));

describe("Task Component", () => {
  const mockTask = {
    dragableId: "task-1",
    index: 0,
    title: "Test Task",
    description: "This is a test task.",
    completed: false,
    onDelete: jest.fn(),
    onComplete: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders task details correctly", () => {
    const { getByText } = render(<Task {...mockTask} />);

    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("This is a test task.")).toBeInTheDocument();
    expect(getByText("Pending")).toBeInTheDocument();
  });

  it("triggers onDelete when delete button is clicked", () => {
    const { getByText } = render(<Task {...mockTask} />);
    const deleteButton = getByText("Delete");

    fireEvent.click(deleteButton);

    expect(mockTask.onDelete).toHaveBeenCalled();
  });

  it("triggers onComplete when complete button is clicked", () => {
    const { getByText } = render(<Task {...mockTask} />);
    const completeButton = getByText("Pending");

    fireEvent.click(completeButton);

    expect(mockTask.onComplete).toHaveBeenCalled();
  });
});
