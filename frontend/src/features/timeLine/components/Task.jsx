import React from 'react';
import {useState} from "react";
import Modal from "./Modal";

const Task = ({task}) => {
  const [isModalOpen,setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        key={task.id} 
        style={{ position:"absolute", top:`${task.topLength * 60}px`, backgroundColor:"blue",color:"white",height:`${task.height * 60}px` ,width:"90%" ,marginLeft:"5%" }}
        onClick={()=>setIsModalOpen(true)}
      >
        {task.title}
      </div>
      { isModalOpen && 
        <Modal task={task} setIsModalOpen={setIsModalOpen} />
      }
    </>
  )
}

export default Task