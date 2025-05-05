import React from "react";
import { useState, useEffect, useRef } from "react";
import  useTimer  from "./hooks/useTimer";
import { getCurrentTask } from "./api/getCurrentTask";
import { handleStopWatchClick } from "./utils/handleStopWatchClick";
import TaskInput from "./components/taskInput";
import StopWatchButton from "./components/StopWatchButton";
import TaskTitle from "./components/taskTitle";
import StopWatch from "./components/StopWatch";


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
    <div className="w-screen h-28 max-w-7xl mx-auto flex justify-between items-center gap-16 px-8">
      {isRunning ? <TaskTitle taskTitle={taskTitle} /> : <TaskInput taskTitle={taskTitle}  setTaskTitle={setTaskTitle} /> }
      <div className="flex gap-4">
        <StopWatch time={time} isRunning={isRunning} />
        <StopWatchButton
          taskTitle={taskTitle}
          isRunning={isRunning}
          clickHandler={()=>{handleStopWatchClick({isRunning,setIsRunning,setTaskTitle,setTime,setResponse,timerId,taskTitle,setTimeDiff,taskStartTime})}}
        />  
      </div>
    </div>
  );
};

export default TimerArea;