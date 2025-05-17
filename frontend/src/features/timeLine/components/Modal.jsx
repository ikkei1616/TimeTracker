import React from "react";
import { useState } from "react";
import { taskDelete } from "../api/taskDelete";
import { taskEdit } from "../api/taskEdit";
import {clsx} from "clsx";

const Modal = ({ task, setIsModalOpen, setTasks }) => {
  const [response, setResponse] = useState(null);
  const [reName, setReName] = useState("");
  


  const taskId = task.id;
 
 

  const handleDelete = () => {
    console.log("デリートボタンがクリックされました。");
    taskDelete({ taskId, setTasks, setResponse });
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    console.log("クリックはできてるよ")
    const {resStatus,editedTask} = taskEdit({taskId,title:reName});
    console.log(resStatus);
    setTasks(editedTask);
  };

  return (
    <div
      className="absolute w-96 h-28 p-4 border-2 z-20 left-[50%] text-mainBlack  border-mainBlack bg-white rounded-lg shadow-2xl font-bold"
      style={{ top: `${task.fromTopDistance * 60 + task.height * 20}px` }}
    >
      <div className="flex justify-between mb-2">
        <p className="text-lg">{task.title}</p>
        <p 
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          ✖️
        </p>
      </div>
      <div className="flex justify-between gap-4">
        <input
          className="border-2 border-mainBlack rounded-lg "
          type="text"
          value={reName}
          onChange={(e) => setReName(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className={
            clsx("w-20   text-white rounded-lg",
              reName ? "bg-gradient-to-r from-mainRed to-mainBlue": "bg-mainGray"
            )
          }
          disabled={!reName}
          
        >
          edit
        </button>
        <button 
          onClick={handleDelete} 
          className="w-20  bg-gradient-to-r bg-mainBlack text-white rounded-lg"
        >
          delete
        </button>
      </div>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Modal;
