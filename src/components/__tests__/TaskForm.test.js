import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toHaveValue, etc.
import TaskForm from "../TaskForm";

describe("TaskForm", () => {
  it("renders correctly", () => {
    render(<TaskForm onAddTask={() => {}} onCloseModal={() => {}} />);

    // Check if the form elements are present
    expect(screen.getByText("Add New Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Task Description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Task" })
    ).toBeInTheDocument();
  });

  it("displays error when title is empty", () => {
    render(<TaskForm onAddTask={() => {}} onCloseModal={() => {}} />);

    const addButton = screen.getByRole("button", { name: "Add Task" });

    // Click the add button without filling in the title
    fireEvent.click(addButton);

    // Check if the error message is displayed
    expect(screen.getByPlaceholderText("Task Title")).toHaveClass(
      "border-red-500"
    );
  });

  it("submits form successfully with valid data", () => {
    const onAddTaskMock = jest.fn();
    const onCloseModalMock = jest.fn();

    render(
      <TaskForm onAddTask={onAddTaskMock} onCloseModal={onCloseModalMock} />
    );

    const titleInput = screen.getByPlaceholderText("Task Title");
    const descriptionTextarea = screen.getByPlaceholderText("Task Description");
    const addButton = screen.getByRole("button", { name: "Add Task" });

    // Fill in the form inputs
    fireEvent.change(titleInput, { target: { value: "Sample Title" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "" },
    });

    // Submit the form
    fireEvent.click(addButton);

    // Check if the form values are cleared and the functions are called
    expect(titleInput).toHaveValue("");
    expect(descriptionTextarea).toHaveValue("");
    expect(onAddTaskMock).toHaveBeenCalledWith({
      title: "Sample Title",
      description: "",
    });
    expect(onCloseModalMock).toHaveBeenCalled();
  });

  it("closes modal when clicking outside", () => {
    const onCloseModalMock = jest.fn();

    render(<TaskForm onAddTask={() => {}} onCloseModal={onCloseModalMock} />);

    const modal = screen.getByTestId("modal");

    // Click outside the modal
    fireEvent.mouseDown(document.body);

    // Check if the onCloseModal function is called
    expect(onCloseModalMock).toHaveBeenCalled();
  });
});
