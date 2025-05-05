import React from 'react';
import {useEffect} from "react";


const useTimer = ({timerId,taskStartTime,timeDiff,setTime,isRunning}) => {
    useEffect(() => {
      if (isRunning) {
        timerId.current = setInterval(()=>{
          console.log("duration",new Date() - taskStartTime.current + timeDiff)
          const duration = Math.floor((new Date() - taskStartTime.current + timeDiff)/1000)
          setTime(duration);
        }, 1000)
      }
      return () => clearInterval(timerId.current);
    }, [isRunning]);
  
  
}

export default useTimer;