import Header from "../components/Header";
import {useState,useEffect} from "react";
import {signInCheck} from "../features/auth/api";
import SignIn from "./signIn";
import SignUp from "./SignUp"

function App() {
  const [isSignIn, setIsSignIn] =useState(null);

  useLayoutEffect(()=>{
  },[])
  return (
    <>
      {isSignIn?<SignIn/>:<SignUp/>}
      <Header></Header>
      <main></main>
    </>
  )
}

export default App
