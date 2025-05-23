import React from 'react'
import clsx from "clsx"

const TaskTitle= ({taskTitle,isRunning}) => {
  return (
    <div
      className={clsx(
        "pl-12  text-center font-bold",
        isRunning ? "text-5xl" : "text-4xl"
      )}
    >{taskTitle}</div>
  )
}

export default TaskTitle;