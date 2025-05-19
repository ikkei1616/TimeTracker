import { apiFetcher } from "../../../utils/apiFetcher";

export const taskDelete = async ({taskId,setTasks,setResponse}) => {

  try {
    const data = await apiFetcher({httpMethod:"DELETE",pass:`http://localhost/api/task/tasks/${taskId}`})

    setTasks((prev)=> prev.filter(task => task.id !== data.tasks[0].id));

  } catch (error) {
    console.error("Error:task delete",error);
    setResponse(error)
  }

}