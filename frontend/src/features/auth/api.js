import { apiFetcher } from "../../utils/apiFetcher";

export const sendPostRequest = async ({pass,email,name,setResponse}) => {
  const postData = {
    pass: pass,
    email: email,
    name:name,
  };

  try {
    const data = await apiFetcher({httpMethod:"POST",pass:"http://localhost/api/account/create",body:postData});
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
    const data = await apiFetcher({httpMethod:"POST",pass:"http://localhost/api/account/login",body:PostData});
    setResponse(data.status);
    
  } catch (error) {
    console.error("Error",error);
    setResponse("Error occurred");
  }
};


export const signInCheck = async ()=>{

  const data = await apiFetcher({httpMethod:"GET",pass:"http://localhost/api/account/checkSignIn"})
  return data.is_signed_in

}

