import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate, NavLink } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Text, Flex, Button, Image, Avatar, Box, Heading, IconButton } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Link as RouteLink } from "react-router-dom";
import NewComment from "../Components/newComment";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Comments from "../Components/Comments";
import { useFormik } from "formik";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function Post() {

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [Post, setPost] = useState([]);
  const [liked, setLiked] = useState(false);
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [postAuthor, setAuthor] = useState([]);
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const navigateToPost = () => {
    navigate(`/posts/${Data.post.id}`)
  }

  const handleLikeClick = () => {
    setLiked(!liked);
    likePost()


  }



  const getPostById = async (postId) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(`http://localhost:8000/posts/api/${postId}`, requestOptions);
    const data = await response.json();

    isLiked()
    if (data.comments === undefined || data.comments === null || data.comments === '') {

      setComments([])
    }
    else {
      setData(data)
      setAuthor(data.author)
      setComments(data.comments)
      
    }
  }

  const formik = useFormik({
    initialValues: {
      comment_body: "",
      post_id: id
    },
    onSubmit: (values) => {
      if ((values.comment_body === "" || values.comment_body === null)) {
        alert("Comment body cannot be empty")
      } else {
        submitCreateComment(values)
      }
    }
  })

  const submitCreateComment = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(values)
    }
    const response = await fetch('http://localhost:8000/comments/', requestOptions);
    const data = await response.json();
    if (!response.ok) {
      navigate("/login")
    }
    else {
      navigate(0)
    }

  }

  useEffect(() => {
    getPostById(id);
    // setAuthor(data.author);
    // setComments(data.comments)

  }, [])

  const getCurrentUser = async () => {
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
      navigate("/login")
    }
    else {
      setCurrentUser(data);
    }
  };

  useEffect(() => {
    getCurrentUser();
  },[])


  const likePost = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
    const response = await fetch(`http://localhost:8000/posts/like/${id}`, requestOptions);
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
    const response = await fetch(`http://localhost:8000/posts/isLiked/${id}`, requestOptions);
    const data = await response.json();
    if(!response.ok) {
      alert("Error")
    }else {
      if(data === true) {
        setLiked(true)
      }
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

  const navigateToUserProfile = () => {
    if(postAuthor?.username === username){
      navigate("/profile/me")
    }else {
      navigate(`/profile/${postAuthor?.username}`)
    }
  }



  return (
    <>
      <Sidebar />

      <div class="mx-auto max-w-xl ">
        <div className="flex justify-center w-full">
          <div class="w-full rounded-lg overflow-hidden shadow-lg  dark:bg-post bg-light_post text-black dark:text-white  ">
            <div class="flex items-center ">
              <img class="w-10 h-10 rounded-full mr-4" src={postAuthor?.profile_img} alt="" onClick={navigateToUserProfile}/>
              <div class="text-sm">
                <p class=" leading-none dark:text-white"> {postAuthor?.username}  </p>
                <p class="dark:text-white"> {Data?.date} </p>
              </div>
            </div>
            <RouteLink to={`/posts/${id}`}>
              <img class="w-full" src="" alt="" />
              <div class="px-6 py-4" id={id}>
                <p class="dark:text-white text-base">
                  {Data.post_body}
                </p>
              </div>
            </RouteLink>
            <div class="px-6 pt-4 pb-2 flex dark:text-white">
            <div>
              <button onClick={handleLikeClick}>
                <FavoriteBorderIcon className=" hover:text-red-500 hover:scale-125 transition duration-500" style={{ color: liked ? 'red' : 'white' }} />
              </button>
              <span className="mr-2">{Data?.like_count}</span>
              </div>
              <button  >
                <ModeCommentIcon className=" hover:text-blue-300 hover:scale-125 transition duration-500" onClick={onOpen} />
                <span> {comments.length} </span>
                
                <Modal isOpen={isOpen} onClose={onClose} className='dark:bg-post dark:text-white'>

                  <form onSubmit={formik.handleSubmit}>

                    <ModalOverlay />
                    <ModalContent className='dark:bg-main max-w-lg h-3/4 mx-auto'>
                      <ModalHeader className='dark:text-white justify-center mx-auto mt-8 mb-3' >Post a Comment</ModalHeader>
                      <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                      <ModalCloseButton />
                      <ModalBody>
                        <div className='flex'>
                          <img class="w-10 ml-8 h-10 rounded-full  cursor-pointer" src="https://scontent.fesb4-2.fna.fbcdn.net/v/t1.6435-1/101609179_2632699070336337_215906240738361344_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=LkHdOixKXDcAX8C5fBe&_nc_ht=scontent.fesb4-2.fna&oh=00_AfA6ZqTCR3dwZK1gJTsjEHYCgsJeZ8xh6TEZbawxelOlrg&oe=64EB65B4" alt="" />
                          <Text className='dark:text-white ml-2' >{username}</Text>
                        </div>
                        <div>

                          <div className='dark:bg-main dark:text-gray-400 text-3xl mt-4 ml-2'>

                            <textarea
                              name="comment_body"
                              defaultValue=""
                              rows={4}
                              cols={40}
                              onChange={formik.handleChange}
                              value={formik.values.comment_body}
                              placeholder={`What's on your mind ${username}`}
                              className="dark:bg-main w-full"
                              style={{ resize: 'none', border: 'none', outline: 'none' }}
                            />
                          </div>
                          <div className='flex justify-end dark:text-white'>
                          </div>
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <div className='w-full ml-3 mr-3'>
                          <div className='w-full border-2 dark:border-gray-400 rounded-lg mt-3'>
                            <div className='flex justify-between '>
                              <div > <Text className='dark:text-white mt-3 mb-3 ml-2 '> Add to your comment</Text> </div>
                              <div className='flex'>
                                <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <CameraAltIcon className='text-red-500 mr-2' /> </button>
                                <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <CollectionsIcon className='text-green-500 ml-2 mr-2' /> </button>
                                <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <AddReactionIcon className='text-yellow-500 ml-2 mr-2' /></button>
                                <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <MoreHorizIcon className='text-white mr-2' /> </button>

                              </div>
                            </div>
                          </div>
                          <button className='dark:bg-gray-500 w-full top-0 rounded-lg mt-5' type='submit'>
                            <Text className='pt-2 mb-2' >Post</Text>
                          </button>
                        </div>
                      </ModalFooter>
                    </ModalContent>
                  </form>
                </Modal>
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="relative flex py-5 items-center">
              <div class="flex-grow border-t border-gray-400"></div>
              <span class="flex-shrink mx-4 text-gray-400">Comments</span>
              <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <NewComment post_id = {id} current_user = {currentUser}  />
      {comments.map(comment => {
        return (
          <div className='mt-3 text-black'>

            <Comments key={comment.id} comment={comment} author={comment.author} />
          </div>
        )
      })}
      

    </>
  )
}