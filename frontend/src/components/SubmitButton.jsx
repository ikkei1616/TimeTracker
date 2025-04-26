import React from 'react';



const SubmitButton = ({isFilled,handleClick,text}) => {
  return (
    <button 
      type="submit"
      onClick={handleClick}
      className={
        isFilled? 
          "mt-4 rounded-xl p-2 bg-gradient-to-r from-mainRed to-mainBlue text-white font-bold" 
          :
          "mt-4 rounded-xl p-2 bg-gray-400 text-white font-bold" 
      }
      disabled={!isFilled} 
    >
      {text}
    </button>
  )
}

export default SubmitButton