import React from 'react';
import {useState,useEffect} from "react";
import AuthInput from "./AuthInput";
import {sendPostRequest}  from "../features/auth/api";

const SignUpForm = () => {
    const [response, setResponse] = useState(null);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [isFilled,setIsFilled] = useState(false);
  
    useEffect(()=>
      {
        if (name && email && pass) {
          setIsFilled(true);
        }
      },
      [name,email,pass]
    )
  
  return (
    <div className="flex flex-col text-center   w-111 p-12">
      <div className="text-4xl font-bold">
        <span className="gradationUnderBar  inline-block">SignUp</span>
      </div>
      <AuthInput value={name} setFunction={setName} fieldName="name" />
      <AuthInput value={email} setFunction={setEmail} fieldName="email" />
      <AuthInput value={pass} setFunction={setPass} fieldName="pass"/>
      <button 
        type="submit"
        onClick={()=>sendPostRequest({name,pass,email,setResponse})}
        className={isFilled? 
          "mt-4 rounded-xl p-2 bg-gradient-to-r from-mainRed to-mainBlue text-white font-bold" 
          :
          "mt-4 rounded-xl p-2 bg-gray-400 text-white font-bold" 
        }
        
        disabled={!isFilled} 
      >
        Register
      </button>
      <div> {response && <p>Response: {JSON.stringify(response)}</p>}</div>
    </div>   
  )
}

export default SignUpForm