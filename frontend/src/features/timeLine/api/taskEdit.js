export const taskEdit = async ({ taskId, title }) => {
  const placeHolder = {
    task: { title },
  };
  console.log("タイトル",title);
  console.log("できてる？");
  try {
    const res = await fetch(`http://localhost/api/task/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeHolder),
      credentials: "include"
    });

    const data = await res.json();
    
    if (res.ok) { 
      const resStatus = data.status;
      const editedTask = data.data;

      return { resStatus, editedTask };
    } else {

      return {
        resStatus:"error",
        errorMessage: data.message || "タスクの更新に失敗しました。"
      }
    }
  } catch (e) {
    console.error("Error:", e);
    return {
      resStatus:"error",
      errorMessage:"タスクの更新失敗",
    }
  }
};
