import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link as RouteLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';


export default function Post(props) {

  const [author, setAuthor] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setAuthor(props.post.author)

  }, [])
  const likePost = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
    const response = await fetch(`http://localhost:8000/posts/like/${props.post?.id}`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      alert("Post could not be liked")
    }
    else {
      alert("Post liked")
    }
  }

  const getUsername = async () => {
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
    getUsername();
  })

  const navigate = useNavigate();

  const redirectToProfile = () => {
    navigate("/profile/me")
  }


  const navigateToPost = () => {
    navigate(`/posts/${props.post?.id}`)
  }

  const navigateToUserProfile = () => {
    if(username === props.post.author?.username){
      navigate("/profile/me")
    }else {
      navigate(`/profile/${props.post.author?.username}`)
    }
  }




  return (
    <>
      <div className="flex justify-center w-full border-2 dark:border-post  dark:text-white bg-light_post text-black dark:bg-post rounded-lg">
        <div class="w-full rounded overflow-hidden shadow-lg p-2">
          <div class="flex items-center ">
            <img class="w-10 h-10 rounded-full mr-4 cursor-pointer" src={author?.profile_img} alt="" onClick={navigateToUserProfile} />
            <div class="text-sm">
              <p class=" leading-none dark:text-white"> {props.post.author?.username} </p>
              <p class="dark:text-white">{props.post.date}</p>
            </div>
          </div>
          <RouteLink to={`/posts/${props.post?.id}`}>
            <img class="w-full" src="" alt="" className="rounded-lg max" onClick={navigateToUserProfile} />
            <div class="px-6 py-4" id={props.post?.id}>
              <p class="dark:text-white text-base">
                {props.post.post_body}
              </p>
            </div>
          </RouteLink>
          <div class="px-6 pt-4 pb-2">
            <button onClick={likePost}>
              <FavoriteBorderIcon className="mr-2 hover:text-red-500 hover:scale-125 transition duration-500"   />
            </button>
            <button>


              <ModeCommentIcon className="mr-2 hover:text-blue-300 hover:scale-125 transition duration-500" />
            </button>

          </div>
        </div>

      </div>



      {/* <div className="flex flex-col m-3 w-full">
        <RouteLink to={`/posts/${props.post.id}`}>
          <div className="flex  justify-center">
            <div id={props.post.id}>
              <div>
                {props.post.post_body}
              </div>
            </div>
          </div>

        </RouteLink>
        <div className="flex justify-end">
          <button>
            <FavoriteBorderIcon className="mr-2 hover:text-red-500 hover:scale-125 transition duration-500" />
          </button>
          <button onClick={navigateToPost}>
            <ModeCommentIcon className="mr-2 hover:text-blue-300 hover:scale-125 transition duration-500" />
          </button>
        </div>
      </div> */}

    </>

  )
}