import { apiFetcher } from "../../../utils/apiFetcher";

export const getTasks = async () => {
  try {
    const data = await apiFetcher({
      httpMethod: "GET",
      pass: "http://localhost/api/task/tasks",
    });
    return data.tasks;
  } catch (error) {
    throw new Error(error);
  }
};
