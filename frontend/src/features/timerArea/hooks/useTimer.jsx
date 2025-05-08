import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";

const useTimer = ({ taskStartTime, timeDiff, isRunning }) => {
  const intervalId = useRef(null);
  const [taskElapsedSeconds, setTime] = useState(null);

  const stopTimer = useCallback(() => {
    setTime(null);
    clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        console.log("duration", new Date() - taskStartTime + timeDiff);
        const duration = Math.floor(
          (new Date() - taskStartTime + timeDiff) / 1000
        );
        setTime(duration);
      }, 1000);
    }
    return () => clearInterval(intervalId.current);
  }, [isRunning]);

  return {
    intervalId,
    taskElapsedSeconds,
    stopTimer,
  };
};

export default useTimer;
