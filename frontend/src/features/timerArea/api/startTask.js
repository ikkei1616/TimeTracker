import { apiFetcher } from "../../../utils/apiFetcher";

export const startTask = async ({taskTitle,setResponse}) => {
  const postData = {
    "title": taskTitle,
  };

  try {
    const data = await apiFetcher({httpMethod:"POST",pass:"http://localhost/api/task/start",body:postData})
    
    setResponse(data.message)
    const responseMessage = data.message;
    const receivedTaskTitle = data.tasks.title; 
    const serverTime = data.server_time;

    return {responseMessage,receivedTaskTitle,serverTime}

  } catch (error) {
    console.error("Error: ",error);
    setResponse("タスクの開始失敗しました。")
  }
}