export const sendPostRequest = async ({pass,email,name,setResponse}) => {
  const postData = {
    pass: pass,
    email: email,
    name:name,
  };

  try {
    const res = await fetch('http://localhost/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await res.json();
    setResponse(data.message);
  } catch (error) {
    console.error('Error:', error);
    setResponse('Error occurred');
  }
};

