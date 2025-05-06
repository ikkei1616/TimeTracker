import React from 'react'
import { formatSecondsToTime } from '../utils/formatSecondsToTIme'
import clsx from "clsx";


const StopWatch = ({time,isRunning}) => {
  return (
    <div className={clsx(
        " font-bold ",
        isRunning ? "text-4xl text-color-ccc": " text-3xl text-gray-400"
      )}
    >
      {formatSecondsToTime(time)}
    </div>
  )
}

export default StopWatch