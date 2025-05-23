import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import useTimer from "./hooks/useTimer";
import TaskInput from "./components/taskInput";
import StopWatchButton from "./components/StopWatchButton";
import TaskTitle from "./components/taskTitle";
import StopWatch from "./components/StopWatch";

import { getCurrentTask } from "./api/getCurrentTask";
import { startTask } from "./api/startTask";
import { endTask } from "./api/endTask";

const TimerArea = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [clientClockOffset, setClientClockOffset] = useState(null);
  const [response, setResponse] = useState(null);
  const taskStartTime = useRef(null);

  useEffect(() => {
    getCurrentTask().then((result) => {
      setResponse(result.response);
      setTaskTitle(result.taskTitle);
      setClientClockOffset(result.clientClockOffset);
      setIsRunning(result.isRunning);
      taskStartTime.current = result.taskStartTime;
    });
  }, []);

  const { taskElapsedSeconds, stopTimer, startTimer } = useTimer({
    taskStartTime: taskStartTime.current,
    clientClockOffset,
  });

  useEffect(() => {
    if (isRunning) startTimer();
  }, [isRunning, startTimer]);

  const handleStopWatchClick = useCallback(() => {
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
        console.log("clientClockOffset", clientTime - new Date(serverTime));

        setResponse(responseMessage);
        setTaskTitle(receivedTaskTitle);
        setClientClockOffset(clientTime - new Date(serverTime));
        taskStartTime.current = new Date(serverTime);
        setIsRunning((prev) => !prev);
      };
      startTaskHandler();
    }
  }, [isRunning, stopTimer, taskTitle]);

  return (
    <div className="w-screen h-[9vh] border-b-2 border-black">
      <div className="w-10/12 h-full max-w-7xl mx-auto  flex justify-between items-center ">
        {isRunning ? (
          <TaskTitle taskTitle={taskTitle} isRunning={isRunning} />
        ) : (
          <TaskInput taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
        )}
        <div className="flex gap-12 items-center ">
          <StopWatch time={taskElapsedSeconds} isRunning={isRunning} />
          <StopWatchButton
            taskTitle={taskTitle}
            isRunning={isRunning}
            clickHandler={handleStopWatchClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerArea;
