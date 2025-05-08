export const getCurrentTask = async () => {
  try {
    const res = await fetch("http://localhost/api/task/current_task", {
      method: "GET",
      credentials: "include",
    });
    const clientTime = new Date();
    console.log("res.ok", res.ok);

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      const responseMessage = data.message;
      const receivedTaskTitle = data.tasks[0].title;
      //utc→jst時刻に変換
      const startTime = new Date(data.tasks[0].start_time);
      startTime.setHours(startTime.getHours() + 9);

      return {
        isRunning: true,
        response: responseMessage,
        taskTitle: receivedTaskTitle,
        clientClockOffset: clientTime - new Date(data.server_time),
        taskStartTime: startTime,
      };
    }
  } catch (error) {
    console.log("Error:", error);
    return {
      isRunning: false,
      response: error,
      taskTitle: "",
      clientClockOffset: null,
      taskStartTime: null,
    };
  }
};
