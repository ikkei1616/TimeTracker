export const sendPostRequest = async ({pass,email,name,setResponse}) => {
  const postData = {
    pass: pass,
    email: email,
    name:name,
  };

  try {
    const res = await fetch('http://localhost/api/account/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include' 
    });

    const data = await res.json();
    setResponse(data.message);
  } catch (error) {
    console.error('Error:', error);
    setResponse('Error occurred');
  }
};


export const signIn = async (name,pass,setResponse) => {
  const PostData = {
    name:name,
    pass:pass,
  };

  try {
    const res = await fetch("http://localhost/api/account/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PostData),
      credentials: "include"
    });

    const data = await res.json();
    setResponse(data.status);
    
  } catch (error) {
    console.error("Error",error);
    setResponse("Error occurred");
  }
};


export const signInCheck = async ({setIsSignIn})=>{
  const res = await fetch("http://localhost/api/account/checkSignIn",{ 
    method:"GET",
    credentials: "include",});
  const data =await  res.json();
  setIsSignIn(data.result);
  

}

