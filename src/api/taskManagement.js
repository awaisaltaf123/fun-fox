const endPoint = process.env.REACT_APP_NODE_API_ENDPOINT;
const port = process.env.REACT_APP_PORT;

// Function to fetch user's tasks from the API
export const fetchUsersTasks = async () => {
  try {
    const response = await fetch(`http://${endPoint}:${port}/api/userTasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Function to fetch users from mockUsers.json
export const fetchUsersGroup = async () => {
  try {
    const response = await fetch(`http://${endPoint}:${port}/api/userGroups`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
