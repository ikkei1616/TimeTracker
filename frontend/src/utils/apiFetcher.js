export const apiFetcher = async ({ httpMethod, pass, body = undefined }) => {
  const csrfToken = localStorage.getItem("csrfToken");
  
  console.log("fethcerでのcsrfトークン",csrfToken);
  const method = httpMethod.toUpperCase();
  const headers = {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  };

  if ((httpMethod == "GET" || httpMethod == "DELETE") && body) {
    throw new Error("GETまたはDELETEメソッドにbodyを含めることはできません。");
  }

  const fetchOptions ={
    method,
    headers,
    credentials: "include",
    ...(body ? { body : JSON.stringify(body) } : {} )
  }

  const res = await fetch(pass,fetchOptions);
  
  const data = await res.json()

  localStorage.setItem("csrfToken",data.csrf_token);

  if (!res.ok) {
    throw new Error(`Error:${res.status}`);
  }
  
  return data;
};

