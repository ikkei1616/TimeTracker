import React from 'react'

const SignUpForm = () => {
  return (
    <form className="flex flex-col text-center  bg-yellow-300 w-111 p-12">
      <div className="text-4xl font-bold">
        <span className="gradationUnderBar  inline-block">SingUp</span>
      </div>
      <div className="mt-4 rounded-xl bg-gradient-to-r from-mainRed to-mainBlue p-0.5">
        <input type="text"  className="w-full p-1.5 rounded-xl "/>
      </div>
      <div className="mt-4 rounded-xl bg-gradient-to-r from-mainRed to-mainBlue p-0.5">
        <input type="text"  className="w-full p-1.5 rounded-xl "/>
      </div>
      <button type="submit" className="mt-4 rounded-xl p-2 bg-gradient-to-r from-mainRed to-mainBlue text-white font-bold">Register </button>
    </form>   
  )
}

export default SignUpForm