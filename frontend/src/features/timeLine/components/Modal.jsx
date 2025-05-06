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
      className="absolute w-96 h-32 bg-red-600"
      style={{top:`${task.topLength * 60 + 20}px`, left:"800px", backgroundColor:"red",color:"white",zIndex:"2",  }}
      onClick={()=>{setIsModalOpen(false)}}
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