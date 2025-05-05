import React from "react";
import { useState, useEffect, useRef } from "react";
import  useTimer  from "./hooks/useTimer";
import { getCurrentTask } from "./api/getCurrentTask";
import { formatSecondsToTime } from "./utils/formatSecondsToTIme";
import { handleStopWatchClick } from "./utils/handleStopWatchClick";


const TimerArea = () => {
  const [time, setTime] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeDiff, setTimeDiff] = useState(null);
  const [response,setResponse] = useState(null);
  const timerId = useRef(null);
  const taskStartTime = useRef(null);

  useEffect(()=>{
    getCurrentTask({setIsRunning,setResponse,setTaskTitle,setTimeDiff,taskStartTime});
  },[])
  
  useTimer({timerId,taskStartTime,timeDiff,setTime,isRunning})


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
          onClick={()=>{handleStopWatchClick({isRunning,setIsRunning,setTaskTitle,setTime,setResponse,timerId,taskTitle,setTimeDiff,taskStartTime})}}
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