import React from 'react';
import { sendPostRequest } from '../features/auth/api';


const SubmitButton = ({name,pass,email,setResponse,isFilled}) => {
  return (
    <button 
      type="submit"
      onClick={()=>sendPostRequest({name,pass,email,setResponse})}
      className={
        isFilled? 
          "mt-4 rounded-xl p-2 bg-gradient-to-r from-mainRed to-mainBlue text-white font-bold" 
          :
          "mt-4 rounded-xl p-2 bg-gray-400 text-white font-bold" 
      }
      disabled={!isFilled} 
    >
      Register
    </button>
  )
}

export default SubmitButton