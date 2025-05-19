import { apiFetcher } from "../../../utils/apiFetcher";

export const getCurrentTask = async () => {
  try {
    const data = await apiFetcher({httpMethod:"GET",pass:"http://localhost/api/task/current_task"})
    const clientTime = new Date();

    
    console.log(data);
 
    const responseMessage = data.message;
    const receivedTaskTitle = data.tasks[0].title;
    //utc→jst時刻に変換
    const startTime = new Date(data.tasks[0].start_time);

    return {
      isRunning: true,
      response: responseMessage,
      taskTitle: receivedTaskTitle,
      clientClockOffset: clientTime - new Date(data.server_time),
      taskStartTime: startTime,
    };

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
