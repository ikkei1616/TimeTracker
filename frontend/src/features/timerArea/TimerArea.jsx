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
    <div className="w-screen border-b-2 border-black">
      <div className="w-screen h-28 max-w-7xl mx-auto px-8 flex justify-between items-center ">
        {isRunning ? <TaskTitle taskTitle={taskTitle} isRunning={isRunning} /> : <TaskInput taskTitle={taskTitle}  setTaskTitle={setTaskTitle} /> }
        <div className="flex gap-12 items-center ">
          <StopWatch time={time} isRunning={isRunning} />
          <StopWatchButton
            taskTitle={taskTitle}
            isRunning={isRunning}
            clickHandler={()=>{handleStopWatchClick({isRunning,setIsRunning,setTaskTitle,setTime,setResponse,timerId,taskTitle,setTimeDiff,taskStartTime})}}
          />  
        </div>
      </div>
    </div>
   
  );
};

export default TimerArea;