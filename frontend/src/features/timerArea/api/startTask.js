export const startTask = async ({taskTitle,setResponse}) => {
  const postData = {
    "title": taskTitle,
  };

  try {
    const res = await fetch("http://localhost/api/task/start",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body :JSON.stringify(postData),
      credentials: "include"
    });
    
    const data = await res.json();
    console.log("取得データ",data)
    setResponse(data.message)
    const responseMessage = data.message;
    const receivedTaskTitle = data.tasks.title; 
    const serverTime = data.server_time;

    return {responseMessage,receivedTaskTitle,serverTime}

  } catch (error) {
    console.log("Error: ",error);
    setResponse("タスクの開始失敗しました。")
  }
}