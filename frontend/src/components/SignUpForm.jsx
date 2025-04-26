
import React from 'react';
import {useState,useEffect} from "react";
import AuthInput from "./AuthInput";
import SubmitButton from "./SubmitButton";
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
      <div className="text-5xl font-bold">
        <span className="gradationUnderBar  inline-block ">SignUp</span>
      </div>
      <AuthInput value={name} setFunction={setName} fieldName="name" />
      <AuthInput value={email} setFunction={setEmail} fieldName="email" />
      <AuthInput value={pass} setFunction={setPass} fieldName="pass"/>
      <SubmitButton isFilled={isFilled} handleClick={()=>{sendPostRequest({pass,email,name,setResponse})}} text="Register"/>
      <div> {response && <p>Response: {JSON.stringify(response)}</p>}</div>
    </div>   

  )
}

export default SignUpForm