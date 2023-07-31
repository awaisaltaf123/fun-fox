// Function to filter user's group and extract relevant task data based on the group ID

export const filterGroupAndExtractIds = (groupData, taskData, groupId) => {
  const filteredGroup =
    groupData?.filter((item) => item?.groupId == groupId) ?? [];
  const userIds = filteredGroup?.map((item) => item?.id) ?? [];
  const filteredTasks =
    taskData?.filter((item) => userIds.includes(item?.userId)) ?? [];
  return filteredTasks;
};
