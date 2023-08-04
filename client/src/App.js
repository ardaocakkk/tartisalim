import './App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Components/PostComponent';
import Header from './Components/Header/Header';
import { MinusIcon } from '@chakra-ui/icons'
import Sidebar from './Components/Sidebar';
import NewPost from './Components/newPost';
import { Divider, Text } from '@chakra-ui/react';
import { Form } from 'formik';
import { useFormik } from "formik";
import { Input } from "@chakra-ui/react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { dark } from '@mui/material/styles/createPalette';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [getCheckToken, setCheckToken] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const formik = useFormik({
    initialValues: {
      post_body: ""
    },
    onSubmit: (values) => {
      if ((values.post_body === "" || values.post_body === null)) {
        alert("Post body cannot be empty")
      } else {
        submitCreatePost(values)
      }
    }
  })

  const handleLikeClick = () => {
    setLiked(!liked);

  }

  const submitCreatePost = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(values)
    }
    const response = await fetch('http://localhost:8000/posts/', requestOptions);
    const data = await response.json();
    if (!response.ok) {
      navigate("/login")
    }
    else {
      navigate(0)
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
      navigate("/login")
    }
    else {
      setUsername(data.username);
      setCurrentUser(data);
    }
  };
  useEffect(() => {
    getUsername();
  }, [])

  const getAllPosts = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    }
    const response = await fetch('http://localhost:8000/posts/', requestOptions);
    const data = await response.json();
    setPosts(data.posts);
    if (!response.ok) {
      navigate("/login")
    }
  }
  useEffect(() => {
    getAllPosts();
  }, [])

  const checkToken = () => {
    if (localStorage.getItem('token') !== null) {
      setCheckToken(true);

    } else {
      setCheckToken(false);
    }
  }
  useEffect(() => {
    checkToken();
  })

  const navigateToUserProfile = () => {
    navigate("/profile/me")
  }





  
  return (
    <>
      <Sidebar />

      <div class="mx-auto  justify-center max-w-xl">
        {/* border-b-2 md:border-r-2 md:border-l-2  border-gray-200 dark:border-white */}
        <div class="   dark:text-white rounded-lg ">
          {/* border-b-2 dark:border-gray-300 */}
          <div className='mb-3  rounded roundend-lg'>
          </div>
          <div >
            <div class="overflow-hidden shadow-lg border-2 rounded-xl dark:border-post dark:bg-post mb-3 bg-light_main">
              <div class="px-6 py-4">
                <div class="font-bold flex w-full  text-xl mb-2">
                  <div className='flex w-full bg-light_main'>
                    <img class="w-10 h-10 rounded-full mr-4 cursor-pointer" src={currentUser?.profile_img} alt="" onClick={navigateToUserProfile} />
                    <div className='ml-2 w-full dark:bg-gray-600 rounded-lg hover:dark:bg-gray-400 transition duration-300 cursor-pointer'>
                      <div> <span className='dark:text-gray-400' onClick={onOpen}>  {`What's on your mind, ${username}?`} </span>
                        <div className=''>
                        
                          <Modal isOpen={isOpen} onClose={onClose} className='dark:bg-post dark:text-white' >

                          <form onSubmit={formik.handleSubmit}>
                          
                            <ModalOverlay />
                           
                            <ModalContent className='dark:bg-main max-w-lg h-3/4 mx-auto rounded-lg bg-white'>
                            
                              <ModalHeader className='dark:text-white justify-center mx-auto mt-8 mb-3' >Create Post</ModalHeader>
                              <ModalCloseButton className='dark:text-white' />
                              
                              <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                              
                              <ModalBody>
                                <div className='flex'>
                                  <img class="w-10 ml-8 h-10 rounded-full  cursor-pointer" src={currentUser?.profile_img} alt="" onClick={navigateToUserProfile} />
                                  <Text className='dark:text-white ml-2' >{username}</Text>
                                </div>
                                <div>
                                
                                  <div className='dark:bg-main dark:text-gray-400 text-3xl mt-4 ml-2'>
                                  
                                    <textarea
                                      name="post_body"
                                      defaultValue=""
                                      rows={4}
                                      cols={40}
                                      onChange={formik.handleChange}
                                      value={formik.values.post_body}
                                      placeholder={`What's on your mind, ${username}?`}
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
                                      <div > <Text className='dark:text-white mt-3 mb-3 ml-2 '> Add to your post</Text> </div>
                                      <div className='flex'>
                                        <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <CameraAltIcon className='text-red-500 mr-2' /> </button>
                                        <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <CollectionsIcon className='text-green-500 ml-2 mr-2' /> </button>
                                        <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <AddReactionIcon className='text-yellow-500 ml-2 mr-2' /></button>
                                        <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <MoreHorizIcon className='text-white mr-2'/> </button>

                                      </div>
                                    </div>
                                  </div>
                                  <button className='dark:bg-gray-500 w-full top-0 rounded-lg mt-5 bg-black text-white' type='submit'>
                                    <Text className='pt-2 mb-2' >Post</Text>
                                  </button>
                                </div>
                              </ModalFooter>
                            </ModalContent>
                          </form>
                          </Modal>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <p class="text-gray-700 text-base">
                </p>
              </div>
              <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
              <div class="px-6 pt-4 pb-2">
                <div className='flex flex-row justify-between'>
                
                  <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300' > <CameraAltIcon className='text-red-500' /> <Text className='text-gray-400'> Live Video </Text> </button>
                  <button type='submit' value="Upload"  className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <CollectionsIcon className='text-green-500' /> <Text className='text-gray-400'> Photograph/Gallery </Text> </button>
                  <button className='hover:dark:bg-gray-600 rounded-lg transition duration-300'> <AddReactionIcon className='text-yellow-500' /> <Text className='text-gray-400'> Feelings </Text> </button>
                </div>
              </div>
            </div>
            {posts.map(post => {
              return (
                <div className='flex justify-center w-full pb-2 pt-2 '>
                  <Post key={post.id} post={post}   />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* <div className="">

        <div className='flex flex-col justify-center items-center '>
          {posts.map(post => {
            return (
              <Post key={post.id} post={post} />
            )
          })}
        </div>
        </div> */}
    </>
  );

}


export default App;
