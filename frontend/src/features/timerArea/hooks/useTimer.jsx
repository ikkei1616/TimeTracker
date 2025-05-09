import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";

/**
 * レンダー時に同期して、カウントアップを続ける経過秒数を返すフック。
 * isRunningがtrueになったときに開始する
 * 
 * @props {Date} taskStartTime - タスクの開始時刻
 * @props {number} clientClockOffset - サーバーとクライアントの時刻差（ミリ秒）
 */
const useTimer = ({ taskStartTime, clientClockOffset }) => {
  const intervalId = useRef(null);
  const [taskElapsedSeconds, setTaskElapsedSeconds] = useState(null);

  const stopTimer = useCallback(() => {
    console.log("stopTimer")
    setTaskElapsedSeconds(null);
    clearInterval(intervalId.current);
  }, []);

  const startTimer = useCallback(() => {
    intervalId.current = setInterval(() => {
      console.log("duration", new Date() - taskStartTime + clientClockOffset);
      const duration = Math.floor(
        (new Date() - taskStartTime + clientClockOffset) / 1000
      );
      setTaskElapsedSeconds(duration);
    }, 1000);
  }, [taskStartTime, clientClockOffset]) 

  useEffect(() => {
    return () => clearInterval(intervalId.current);
  }, []);

  return {
    intervalId,
    taskElapsedSeconds,
    stopTimer,
    startTimer
  };
};

export default useTimer;
