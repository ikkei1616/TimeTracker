import React from 'react'

const Modal = ({task,setIsModalOpen}) => {
  return (
    <div 
      className="absolute w-96 h-32 bg-red-600"
      style={{top:`${task.topLength * 60 + 20}px`, left:"800px", backgroundColor:"red",color:"white",zIndex:"2",  }}
      onClick={()=>{setIsModalOpen(false)}}
    >
      {task.title}
    </div>
  )
}

export default Modal