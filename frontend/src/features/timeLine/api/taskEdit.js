import { apiFetcher } from "../../../utils/apiFetcher";

export const taskEdit = async ({ taskId, title }) => {
  const placeHolder = {
    task: { title },
  };

  try {
    const data = await apiFetcher({
      httpMethod: "PATCH",
      pass: `http://localhost/api/task/tasks/${taskId}`,
      body: placeHolder,
    });

    const resStatus = data.status;
    const editedTask = data.data;

    return { resStatus, editedTask };
  } catch (e) {
    console.error("Error:", e);
    return {
      resStatus: "error",
      errorMessage: "タスクの更新失敗",
    };
  }
};
