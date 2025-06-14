import { apiFetcher } from "../../../utils/apiFetcher";

export const taskDelete = async ({ taskId, setTasks }) => {
  const data = await apiFetcher({
    httpMethod: "DELETE",
    pass: `http://localhost/api/task/tasks/${taskId}`,
  }); 
  setTasks((prev) => prev.filter((task) => task.id !== data.tasks[0].id));
  return data;
};


//楽観的な更新になっている。DBの状態とUIが同期していない
//optimisticなUIと言われている。
//バックエンドがDBから削除したことを受けて、その後にフロントから削除したい
//今回の場合だと、DBからタスクが削除されていない状態でも、UIから削除される可能性がる。


//taskDeleteだと、タスクの削除だけを担当しているように見えるし、そうしたい。
