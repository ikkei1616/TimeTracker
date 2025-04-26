
import React from 'react'
import {useState,useEffect} from "react";
import AuthInput from "./AuthInput";
import SubmitButton from './SubmitButton';
import {login} from "../features/auth/api";
import { useNavigate } from "react-router";


const SignInForm = () => {
  const [name,setName] = useState("");
  const [pass,setPass] = useState("");
  const [isFilled,setIsFilled] = useState(false);
  const [response,setResponse] =useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    if (pass && name) {
      setIsFilled(true);
    }
  },[name,pass])

  useEffect(() => {
    if (response === true) {
      navigate("/");
    }
  }, [response]);
  

  return (
    <div className="flex flex-col text-center w-111 p-12 ">
      <div className="text-5xl font-bold">
        <span className="gradationUnderBar  inline-block ">SignIn</span>
      </div>
      <AuthInput value={name} setFunction={setName} fieldName="username" />
      <AuthInput value={pass} setFunction={setPass} fieldName="password"/>
      <SubmitButton text="SignIn" isFilled={isFilled}  handleClick={()=>{login({name,pass,setResponse})}}/>
      <div>{response && <p>ReSPONSE : {JSON.stringify(response)}</p>}</div>
    </div>
  )
}

export default SignInForm