import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Welcome() {
  const [username, setUsername] = useState("");
  const navigator = useNavigate();

  const getWelComeMessage = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },

    };
    const response = await fetch('http://localhost:8000/users/api/me', requestOptions);
    const data = await response.json();
    if (!response.ok) {
      navigator("/login")
    }
    setUsername(data.username);
  };
  useEffect(() => {
    getWelComeMessage();
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    navigator("/")
  }
  const goToProfile = () => {
    navigator("/profile/me")
  }
  return (
    <div className="">
      <h1 className="text-3xl font-bold underline">
        Welcome {username}
      </h1>
      <div className='flex flex-col '>
        <button className="bg-blue-500" onClick={goToProfile}>Profile</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}