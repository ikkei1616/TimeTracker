export const getCurrentTask = async ({taskStartTime}) => {
  try {
    const res = await fetch("http://localhost/api/task/current_task",{
      method:"GET",
      credentials:"include",
    });
    const clientTime = new Date(); 
    console.log("res.ok",res.ok)

    const data = await res.json();
    console.log(data)
    if (res.ok ) { 

      const responseMessage = data.message;
      const receivedTaskTitle = data.tasks[0].title; 
      //utc→jst時刻に変換
      const serverTimeDate = new Date( data.tasks[0].start_time);
      serverTimeDate.setHours(serverTimeDate.getHours() + 9);
      
      taskStartTime.current = serverTimeDate

      return {
        isRunning: true,
        response: responseMessage,
        taskTitle: receivedTaskTitle,
        timeDiff: clientTime - new Date(data.server_time),
      }
    }

  } catch (error) {
    console.log("Error:",error);
    return {
      isRunning: false,
      response: error,
      taskTitle: "",
      timeDiff: null,
    }
  }
}