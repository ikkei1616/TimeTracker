export const endTask = async ({setResponse}) => {

  try {
    const res = await fetch("http://localhost/api/task/end",{
      method:"POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({}),
      credentials: "include"
    });

    const data = await res.json();
    setResponse(data.message);

  } catch (error) {
    console.log("Error: ",error);
    setResponse("タスクの終了失敗");
  }
}