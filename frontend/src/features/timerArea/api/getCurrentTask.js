export const getCurrentTask = async ({setIsRunning,setResponse,setTaskTitle,setTimeDiff,taskStartTime}) => {
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
      setIsRunning(true);

      const responseMessage = data.message;
      const receivedTaskTitle = data.tasks[0].title; 
      //utc→jst時刻に変換
      const serverTimeDate = new Date( data.tasks[0].start_time);
      serverTimeDate.setHours(serverTimeDate.getHours() + 9);
      
      setResponse(responseMessage);
      setTaskTitle(receivedTaskTitle);
      setTimeDiff(clientTime - new Date(data.server_time));
      taskStartTime.current = serverTimeDate
    }

  } catch (error) {
    console.log("Error:",error);
    setResponse("現在のタスク取得失敗")
  }
}