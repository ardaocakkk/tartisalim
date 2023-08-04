import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./PostComponent";

export default function ProfilePost(props) {

  const [checkToken, setCheckToken] = useState(false);


  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setCheckToken(true)
    } else {
      setCheckToken(false)
    }
  }, [])


  return (
    <div className="">
      <div id={props.post.id}>
        <h1 className="text-2xl"> <Post key={props.post.id} post={props.post} profile_image = {props.profile_image}  /> </h1>
      </div>
    </div>
  )
}