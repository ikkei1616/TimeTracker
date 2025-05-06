import React from 'react';
import TimerArea from "../features/timerArea/TimerArea";
import Header from "../components/Header";
import TimeLine from '../features/timeLine/TimeLine';

const Timer = () => {
  return (
    <div className="w-screen  flex flex-col justify-center items-center">
      <Header/>
      <TimerArea/>
      <TimeLine/>
    </div>
  )
}

export default Timer