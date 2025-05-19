import { apiFetcher } from "../../../utils/apiFetcher";

export const endTask = async ({setResponse}) => {
  try {
    const data = await apiFetcher({httpMethod:"POST",pass:"http://localhost/api/task/end"})
    setResponse(data.message);

  } catch (error) {
    console.log("Error: ",error);
    setResponse("タスクの終了失敗");
  }
}