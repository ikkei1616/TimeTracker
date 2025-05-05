import React from 'react'
import  clsx from "clsx";

const StopWatchButton = ({clickHandler,taskTitle,isRunning}) => {
  return (
    <button
      onClick={clickHandler}
      className={clsx(
        "block w-28 h-12 text-white rounded-3xl ",
        taskTitle ?  "bg-gradient-to-r from-mainRed to-mainBlue" : "bg-gray-400"
      )}
      disabled={!taskTitle}
    >
      {isRunning ? "▶" : "▶"}
    </button>
  )
}

export default StopWatchButton