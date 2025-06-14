export const filterDisplayedTask = (tasks) => {
  const today = new Date();
  const DisplayedTasks = tasks.filter((task) => {
    const taskStartTime = new Date(task.start_time);
    const isTaskStartToday = (today.getDate() === taskStartTime.getDate());
    return isTaskStartToday;
  });
  return DisplayedTasks;
};
