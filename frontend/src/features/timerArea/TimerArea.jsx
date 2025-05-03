import React from "react";
import { useState, useEffect, useRef } from "react";
import {startTask} from "./api/startTask";
import {endTask} from "./api/endTask";

const TimerArea = () => {
  const [time, setTime] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeDiff, setTimeDiff] = useState(null);
  const timerId = useRef(null);
  const [response,setResponse] = useState(null);
 

  //数字を"00:00"の形式に変化する関数
  function formatSecondsToTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const paddedMins = String(mins).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');
    return `${paddedMins}:${paddedSecs}`;
  }

  console.log(formatSecondsToTime(3600))
  
  
  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [isRunning]);


  const handleClick = () => {
    if (isRunning ){
      //タイマーストップ時の処理
      setTaskTitle("");
      setTime(null);
      endTask({setResponse});

    } else {
      //タイマー開始時の処理
      startTask({taskTitle,setResponse})
    }

    setIsRunning((state) => !state)
  }

  return (
    <div className="flex gap-16">
      {isRunning ? (
        <p>{taskTitle}</p>
      ) : (
        <input
          value={taskTitle}
          type="text"
          placeholder="タスク名を入力してください"
          className="border border-black border-solid w-52"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      )}

      <div className="flex gap-4">
        <div>{formatSecondsToTime(time)}</div>
        <button
          onClick={handleClick}
          className="border border-black border-solid"
          disabled={!taskTitle}
        >
          {isRunning ? "終了ボタン" : "開始ボタン"}
        </button>
      </div>
    </div>
  );
};

export default TimerArea;