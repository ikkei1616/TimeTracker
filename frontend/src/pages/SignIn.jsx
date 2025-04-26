import React from 'react';
import Title from "../components/Title";
import SignInForm from "../components/SignInForm";

const  SignIn = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <Title/>
      <SignInForm/>
    </div>
  )
}

export default SignIn;
