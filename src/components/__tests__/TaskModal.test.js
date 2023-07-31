import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskModal from "../TaskModal";

// Mock TaskForm component
jest.mock("../TaskForm", () => ({
  // Replace "./TaskForm" with the correct path to your TaskForm component file
  __esModule: true,
  default: ({ onAddTask, onCloseModal }) => (
    <div>
      Mocked TaskForm Component
      <button onClick={onAddTask}>Add Task</button>
      <button onClick={onCloseModal}>Close Modal</button>
    </div>
  ),
}));

describe("TaskModal", () => {
  it("should not render the modal by default", () => {
    render(<TaskModal onAddTask={jest.fn()} />);

    // Assert that the modal content is not present
    const modalContent = screen.queryByText("Mocked TaskForm Component");
    expect(modalContent).not.toBeInTheDocument();
  });

  it("should render the modal when the 'Add New Task' button is clicked", () => {
    render(<TaskModal onAddTask={jest.fn()} />);

    // Click the 'Add New Task' button
    const addTaskButton = screen.getByText("Add New Task");
    fireEvent.click(addTaskButton);

    // Assert that the modal content is present
    const modalContent = screen.getByText("Mocked TaskForm Component");
    expect(modalContent).toBeInTheDocument();
  });

  it("should close the modal when the 'Close Modal' button is clicked", () => {
    render(<TaskModal onAddTask={jest.fn()} />);

    // Click the 'Add New Task' button
    const addTaskButton = screen.getByText("Add New Task");
    fireEvent.click(addTaskButton);

    // Assert that the modal content is present
    const modalContent = screen.getByText("Mocked TaskForm Component");
    expect(modalContent).toBeInTheDocument();

    // Click the 'Close Modal' button
    const closeModalButton = screen.getByText("Close Modal");
    fireEvent.click(closeModalButton);

    // Assert that the modal content is not present
    const modalContentAfterClose = screen.queryByText(
      "Mocked TaskForm Component"
    );
    expect(modalContentAfterClose).not.toBeInTheDocument();
  });
});
