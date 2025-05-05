import React from 'react'
import { formatSecondsToTime } from '../utils/formatSecondsToTIme'
import clsx from "clsx";


const StopWatch = ({time,isRunning}) => {
  return (
    <dvi className={clsx(
        " font-bold ",
        isRunning ? "text-4xl text-color-ccc": " text-3xl text-gray-400"
      )}
    >
      {formatSecondsToTime(time)}
    </dvi>
  )
}

export default StopWatch