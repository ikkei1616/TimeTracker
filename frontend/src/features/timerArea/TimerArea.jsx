import React from "react";
import { useState, useEffect, useRef } from "react";

const TimerArea = () => {
  const [time, setTime] = useState(null);
  const [taskTitle, setTaskTitle] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeDiff, setTimeDiff] = useState(null);
  const timerId = useRef(null);
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

    </div>
  );
};

export default TimerArea;