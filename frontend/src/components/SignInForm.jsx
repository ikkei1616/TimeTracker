
import React from 'react'
import {useState,useEffect} from "react";
import AuthInput from "./AuthInput";
import SubmitButton from './SubmitButton';

const SignInForm = () => {
  const [name,setName] = useState("");
  const [pass,setPass] = useState("");
  const [isFilled,setIsFilled] = useState(false);

  useEffect(()=>{
    if (pass && name) {
      setIsFilled(true);
    }
  },[name,pass])

  return (
    <div className="flex flex-col text-center w-111 p-12 ">
      <div className="text-5xl font-bold">
        <span className="gradationUnderBar  inline-block ">SignIn</span>
      </div>
      <AuthInput value={name} setFunction={setName} fieldName="username" />
      <AuthInput value={pass} setFunction={setPass} fieldName="password"/>
      <SubmitButton text="SignIn" isFilled={isFilled}/>
    </div>
  )
}

export default SignInForm