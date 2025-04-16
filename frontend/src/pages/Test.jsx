
import React from 'react'
import {useEffect,useState} from "react"

const Test = () => {
  const [message,setMessage] = useState("");

  useEffect(()=>{
    fetch("http://localhost/api/hello")
      .then(res => res.json())
      .then(date => setMessage(date.message))
      .catch(err=> console.log(err));

  },[]);
  return (
    <div>{message}</div>
  )
}


export default Test