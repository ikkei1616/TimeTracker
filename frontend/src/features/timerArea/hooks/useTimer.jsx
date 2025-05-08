import React, { useRef } from 'react';
import {useEffect} from "react";


const useTimer = ({taskStartTime,timeDiff,setTime,isRunning}) => {
  const intervalId = useRef(null);

    useEffect(() => {
      if (isRunning) {
        intervalId.current = setInterval(()=>{
          console.log("duration",new Date() - taskStartTime.current + timeDiff)
          const duration = Math.floor((new Date() - taskStartTime.current + timeDiff)/1000)
          setTime(duration);
        }, 1000)
      }
      return () => clearInterval(intervalId.current);
    }, [isRunning]);
  
  return {
    intervalId
  }
}

export default useTimer;