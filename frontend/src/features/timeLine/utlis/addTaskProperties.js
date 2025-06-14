const calcElapsedTimeSinceMidnight = (task) => {
  const midnight = new Date().setHours(0, 0, 0, 0);
  const startTime = new Date(task.start_time);
  const elapsedMsSinceMidnight = startTime - midnight;
  const elapsedHourSinceMidnight = elapsedMsSinceMidnight / 3600000;

  return elapsedHourSinceMidnight;
};

const calcElapsedTimeProperty = (task) => {
  const startTime = new Date(task.start_time);
  const endTime = task.end_time ? new Date(task.end_time) : new Date();
  const elapsedMs = endTime - startTime;
  const elapsedHour = elapsedMs / 3600000;
  return elapsedHour;
};

const calcIsTitleDisplay = (elapsedHour) => {
  return elapsedHour > (2/3);
}

export const addTaskProperties = (tasks) => {
  console.log("addTaskProperties",tasks);
  return tasks.map((task) => {
    const elapsedHourSinceMidnight = calcElapsedTimeSinceMidnight(task);
    const elapsedHour = calcElapsedTimeProperty(task);
    const isTitleDisplay = calcIsTitleDisplay(elapsedHour);
    return { ...task, elapsedHourSinceMidnight, elapsedHour,isTitleDisplay };
  });
};
