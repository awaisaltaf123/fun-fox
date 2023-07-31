import { render, screen } from "@testing-library/react";
import { fetchUsersTasks, fetchUsersGroup } from "../taskManagement";

// Mock the fetch function
global.fetch = jest.fn();

// Define mockEndPoint and mockPort variables
const mockEndPoint = process.env.REACT_APP_NODE_API_ENDPOINT;
const mockPort = process.env.REACT_APP_PORT;

// Mock console.error
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe("fetchUsersTasks", () => {
  it("should fetch user tasks from the API", async () => {
    const mockData = [
      { id: 1, task: "Task 1" },
      { id: 2, task: "Task 2" },
    ];

    // Mock the API response
    global.fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });

    const data = await fetchUsersTasks();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://${mockEndPoint}:${mockPort}/api/userTasks`
    );
    expect(data).toEqual(mockData);
  });

  it("should handle errors when fetching user tasks", async () => {
    const errorMessage = "Failed to fetch tasks";
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    const data = await fetchUsersTasks();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://${mockEndPoint}:${mockPort}/api/userTasks`
    );
    expect(data).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching tasks:",
      new Error(errorMessage)
    );
  });
});

describe("fetchUsersGroup", () => {
  it("should fetch users from the API", async () => {
    const mockData = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];

    // Mock the API response
    global.fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });

    const data = await fetchUsersGroup();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://${mockEndPoint}:${mockPort}/api/userGroups`
    );
    expect(data).toEqual(mockData);
  });

  it("should handle errors when fetching users", async () => {
    const errorMessage = "Failed to fetch users";
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    const data = await fetchUsersGroup();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://${mockEndPoint}:${mockPort}/api/userGroups`
    );
    expect(data).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching users:",
      new Error(errorMessage)
    );
  });
});
