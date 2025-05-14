import React from 'react';
import {useState} from "react";
import Modal from "./Modal";
import {clsx} from "clsx";


const Task = ({task,setTasks}) => {
  const [isModalOpen,setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        key={task.id} 
        className="absolute w-10/12   border bg-gradient-to-r from-mainRed to-mainBlue p-0.5 border-mainBlack rounded-3xl left-1/2 transform -translate-x-1/2 bg-lightGray text-mainBlack text-2xl font-bold "
        style={{ top:`${task.fromTopDistance * 60}px`,height:`${task.height * 60}px`  }}
        onClick={()=>setIsModalOpen(true)}
      >
        <div 
          className={
            clsx("relative",
              task.isTitleDisplay ? "h-full p-2 rounded-3xl bg-lightGray" : ""
            )
          }
        >
          {task.isTitleDisplay && task.title}
        </div>
        { isModalOpen && 
          <Modal task={task} setIsModalOpen={setIsModalOpen} setTasks={setTasks} />
        }
      </div>
    </>
  )
}

export default Task