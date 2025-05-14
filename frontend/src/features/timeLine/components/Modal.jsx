import React from 'react'
import { useState } from "react";
import {taskDelete} from "../api/taskDelete";

const Modal = ({task,setIsModalOpen,setTasks}) => {
  const [response,setResponse] = useState(null);

  const taskId = task.id;
  
  const handleDelete = () => {
    console.log("デリートボタンがクリックされました。")
    taskDelete({taskId,setTasks,setResponse});
    setIsModalOpen(false);
  };

  return (
    <div 
      className="absolute w-96 h-32 p-4 border-2 left-[50%] text-mainBlack  border-lightGray bg-white rounded-lg shadow-2xl "
      style={{top:`${task.height * 60 *0.3}px`  }}
    >
      <p>{task.title}</p>
      <button
        onClick={handleDelete}
      >
        タスク削除
      </button>
      {response && <p>{response}</p>}
    </div>

  )
}

export default Modal