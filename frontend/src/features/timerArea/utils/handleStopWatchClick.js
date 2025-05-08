import { startTask } from "../api/startTask";
import { endTask } from "../api/endTask";

export const handleStopWatchClick = ({
  isRunning,
  setIsRunning,
  setTaskTitle,
  setResponse,
  taskTitle,
  setTimeDiff,
  taskStartTime,
  stopTimer,
}) => {
  if (isRunning) {
    //タイマーストップ時の処理
    setTaskTitle("");
    endTask({ setResponse });
    setIsRunning((state) => !state);

    // useTimerフックのリセット処理
    stopTimer();
  } else {
    //タイマー開始時の処理
    const startTaskHandler = async () => {
      const { responseMessage, receivedTaskTitle, serverTime } =
        await startTask({ taskTitle, setResponse });
      const clientTime = new Date();
      console.log("clientTime", clientTime);
      console.log("timeDiff", clientTime - new Date(serverTime));

      setResponse(responseMessage);
      setTaskTitle(receivedTaskTitle);
      setTimeDiff(clientTime - new Date(serverTime));
      taskStartTime.current = new Date(serverTime);
      setIsRunning((prev) => !prev);
    };
    startTaskHandler();
  }
};
