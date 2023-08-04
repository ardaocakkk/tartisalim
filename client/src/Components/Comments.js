import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useNavigate } from "react-router-dom";

export default function Comments(props) {

  const navigate = useNavigate();
  const [commentAuthor, setAuthor] = useState([])
  const [comments, setComments] = useState([{}])
  const [username, setUsername] = useState("")
  const [liked, setLiked] = useState(false);


  const handleLikeClick = () => {
    setLiked(!liked);
    likeComment()
  }
  useEffect( () => {
    
    setComments(props.comment)
    setAuthor(props.author)
    
  }, [])
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
    isLiked()
    if (!response.ok) {
      navigator("/login")
    }
    setUsername(data.username);
  };

  useEffect(() => {
    getUsername();
  })

  const navigateToUserProfile = () => {
    if(commentAuthor?.username === username){
      navigate("/profile/me")
    }else {
      navigate(`/profile/${commentAuthor?.username}`)
    }
  }

  const likeComment = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
    const response = await fetch(`http://localhost:8000/comments/${comments?.id}/like`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      navigate("/login")
    }
    else {
      navigate(0)
    }
  }

  const isLiked = async () => {
    const requestOptions = {
      method: "GET",
      headers : {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
    const response = await fetch(`http://localhost:8000/comments/a/isLiked/${comments?.id}`, requestOptions);
    const data = await response.json();
    if(!response.ok) {
    }else {
      if(data === true) {
        setLiked(true)
      }
    }
  }

  return (
    <>
    <div class="mx-auto max-w-xl mt-3 mb-3 flex flex-1 dark:text-white">

<div
  class="inline-block h-[10px] min-h-[1em] w-0.5 self-stretch bg-black bg-neutral-100 opacity-100 dark:opacity-50 justify-center mx-auto"></div>
</div>
          <div class="mx-auto max-w-xl dark:bg-post rounded-lg"> 
      <div className="flex justify-center  w-full ">
    <div class="w-full overflow-hidden shadow-lg  ">
    <div class="flex items-center ">
      <img class="w-10 h-10 rounded-full mr-4 cursor-pointer" src={commentAuthor?.profile_img} alt="" onClick={navigateToUserProfile} />
      <div class="text-sm">
        <p class=" leading-none dark:text-white"> {commentAuthor?.username} </p>
        <p class="dark:text-white"> </p>
      </div>
      </div>
      <RouteLink to={`/comments/${comments?.id}`}>
  <img class="w-full" src="" alt=""/>
  <div class="px-6 py-4 " id={comments?.id}> 
    <p class="dark:text-white text-base">
    {comments?.comment_body}
    </p>  
  </div>
  </RouteLink>
  <div class="px-6 pt-4 pb-2 dark:text-white text-black">
  <button  onClick={handleLikeClick}>
  <FavoriteBorderIcon className="mr-2 text-red  hover:text-red-500 hover:scale-125 transition duration-500" style={{ color: liked ? 'red' : 'gray' }} />
  </button>
  <span> {comments?.like_count} </span>
  </div>
</div>
 
</div>

</div>

</>
  )
}