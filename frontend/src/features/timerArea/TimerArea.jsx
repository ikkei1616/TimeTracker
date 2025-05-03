import React from 'react'

const TimerArea = () => {
  const [time, setTime] = useState(null);
  const [taskTitle, setTaskTitle] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeDiff, setTimeDiff] = useState(null);
  const timerId = useRef(null);
  return (
    <div>TimerArea</div>
  )
}

export default TimerArea