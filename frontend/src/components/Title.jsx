import React from 'react'

const Title = () => {
  return (
    <div className="flex justify-center w-screen ">
      <span className="gradationUnderBar">
        <div className="flex items-center">
          <img
            className="w-8 h-8"
            src="../../public/logo_TimeTracker.svg" 
            alt="" 
          />
          <h2 className="ml-2 text-4xl font-bold">Task Tracker</h2>
        </div>
      </span>
    </div>
  )
}


export default Title