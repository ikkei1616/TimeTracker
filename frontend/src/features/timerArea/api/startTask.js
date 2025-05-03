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
    setResponse(data.message)
  } catch (error) {
    console.log("Error: ",error);
    setResponse("タスクの開始失敗しました。")
  }
}