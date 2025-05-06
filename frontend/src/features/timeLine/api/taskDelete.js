export const taskDelete = async ({taskId,setTasks,setResponse}) => {

  try {
    const res = await fetch(`http://localhost/api/task/tasks/${taskId}`,{
      method: "DELETE",
      credentials: "include",
    });
  
    if (res.ok) {
      const data = await res.json();
      console.log("res.json() ",data)
      console.log("data.tasks",data.tasks)
      setTasks((prev)=> prev.filter(task => task.id !== data.tasks[0].id));
    }

  } catch (error) {
    console.log("Error:task delete",error);
    setResponse(error)
  }

}