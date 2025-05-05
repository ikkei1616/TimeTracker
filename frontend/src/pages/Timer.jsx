import React from 'react';
import TimerArea from "../features/timerArea/TimerArea";
import Header from "../components/Header";

const Timer = () => {
  return (
    <div className="w-screen  flex flex-col justify-center items-center">
      <Header/>
      <TimerArea/>
    </div>
  )
}

export default Timer