import React from "react";
import { useState, useEffect, useRef } from "react";

const TimerArea = () => {
  const [time, setTime] = useState(null);
  const [taskTitle, setTaskTitle] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeDiff, setTimeDiff] = useState(null);
  const timerId = useRef(null);

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
      setTaskTitle(null);
      
    } else {
      //タイマー開始時の処理
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
        <div>{time}</div>
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