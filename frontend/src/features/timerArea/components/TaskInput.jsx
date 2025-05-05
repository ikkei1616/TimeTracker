import React from 'react'

const TaskInput = ({taskTitle,setTaskTitle}) => {
  return (
    <input
      value={taskTitle}
      type="text"
      placeholder="タスク名を入力してください"
      className="w-96 h-16 p-4 text-color-ccc text-2xl font-bold"
      onChange={(e) => setTaskTitle(e.target.value)}
    />
  )
}

export default TaskInput;