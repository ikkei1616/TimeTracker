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

    if (res.ok) {
      const data = await res.json();
      console.log("res.json()",data)
      console.log("status",data.status)

      setResponse(data.status);



    }
    
  } catch (error) {
    console.error("Error",error);
    setResponse("Error occurred");
  }
};


export const signInCheck = async ()=>{
  const res = await fetch("http://localhost/api/account/checkSignIn",{ 
    method:"GET",
    credentials: "include",});
  const data =await res.json();
  
  return data.is_signed_in

}

