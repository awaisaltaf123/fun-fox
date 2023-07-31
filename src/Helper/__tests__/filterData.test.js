import { filterGroupAndExtractIds } from "../filterData";

describe("filterGroupAndExtractIds", () => {
  it("should filter user tasks based on the group ID", () => {
    // Mock data
    const groupData = [
      { id: 1, groupId: 1 },
      { id: 2, groupId: 1 },
      { id: 3, groupId: 2 },
    ];

    const taskData = [
      { taskId: 101, userId: 1, task: "Task 1" },
      { taskId: 102, userId: 2, task: "Task 2" },
      { taskId: 103, userId: 3, task: "Task 3" },
      { taskId: 104, userId: 4, task: "Task 4" },
    ];

    const groupId = 1;

    const expectedFilteredTasks = [
      { taskId: 101, userId: 1, task: "Task 1" },
      { taskId: 102, userId: 2, task: "Task 2" },
    ];

    // Call the function
    const filteredTasks = filterGroupAndExtractIds(
      groupData,
      taskData,
      groupId
    );

    // Check the result
    expect(filteredTasks).toEqual(expectedFilteredTasks);
  });

  it("should return an empty array if the group ID is not found", () => {
    // Mock data
    const groupData = [
      { id: 1, groupId: 1 },
      { id: 2, groupId: 1 },
      { id: 3, groupId: 2 },
    ];

    const taskData = [
      { taskId: 101, userId: 1, task: "Task 1" },
      { taskId: 102, userId: 2, task: "Task 2" },
      { taskId: 103, userId: 3, task: "Task 3" },
      { taskId: 104, userId: 4, task: "Task 4" },
    ];

    const groupId = 3; // Group ID not present in groupData

    // Call the function
    const filteredTasks = filterGroupAndExtractIds(
      groupData,
      taskData,
      groupId
    );

    // Check the result
    expect(filteredTasks).toEqual([]);
  });

  it("should return an empty array if the groupData or taskData is not provided", () => {
    // Call the function with empty arrays
    const filteredTasks = filterGroupAndExtractIds([], [], 1);

    // Check the result
    expect(filteredTasks).toEqual([]);
  });
});
