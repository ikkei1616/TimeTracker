import React from "react";


const AuthInput = ({value,setFunction,fieldName}) => {
  let field
  if (fieldName === "pass") {
    field ="パスワード";
  } else if (fieldName === "email") {
    field = "メールアドレス";
  }
  else if (fieldName === "name") {
    field = "名前";
  }

  return (
    <div className="mt-6 rounded-xl bg-gradient-to-r from-mainRed to-mainBlue p-0.5">
      <input
        type="text"
        placeholder={field}
        className="w-full p-1.5 rounded-xl " 
        value={value}
        onChange={(e)=> setFunction(e.target.value)}                                                                        
      >
      </input>
    </div>
  )
}

export default AuthInput;
