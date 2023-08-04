import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePost from "../Components/ProfilePost";
import Sidebar from "../Components/Sidebar";
import DeleteIcon from '@mui/icons-material/Delete';
import { Text } from "@chakra-ui/react";
import FollowingModal from "../Components/FollowingModal";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import FollowersModal from "../Components/FollowersModal";
export default function CurrentUserProfile() {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profileOwner, setProfileOwner] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(profileOwner)

  const handleClick = event => {
    DeletePost(event.currentTarget.id)
  };

  const DeletePost = async (postId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ id: postId })
    }
    const response = await fetch(`http://localhost:8000/posts/${postId}`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      alert("Post could not be deleted")
    } else {
      navigate(0)
    }
  }

  const getCurrentUserProfile = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },

    };
    const response = await fetch('http://localhost:8000/profile/me', requestOptions);
    const data = await response.json();
    setPosts(data.posts)
    setComments(data.comments)
    setProfileOwner(data.user)
    if (!response.ok) {
      navigate("/login")
    }
  };
  useEffect(() => {
    getCurrentUserProfile();
  }, [])

  console.log(profileOwner)

  const backToWelcomePage = () => {
    navigate("/welcome")
  }
  return (
    <>
      <Sidebar />
      <div className="mx-auto max-w-xl  bg-gray-200 dark:bg-post dark:text-white text-black p-10 mb-10 rounded-lg">
        <div className="flex flex-col   dark:bg-post">
          <div className="flex justify-between ">
            <div className="flex">
              <img class="w-10 h-10 rounded-full mr-4 " src={profileOwner?.profile_image} alt="" />
              <p className="dark:text-white text-black text-2xl font-sans">{profileOwner?.username}</p>
            </div>
            <button onClick={onOpen} className="dark:bg-gray-700 rounded-lg bg-black text-white  dark:hover:bg-main transition duration-300"> <Text className="ml-2 mr-2">Edit Profile</Text> </button>
            <Modal isOpen={isOpen} onClose={onClose} className='dark:bg-post dark:text-white' >



              <ModalOverlay />

              <ModalContent className='dark:bg-main max-w-lg h-3/4 mx-auto rounded-lg bg-gray-100'>

                <ModalHeader className='dark:text-white justify-center mx-auto mt-8 mb-3' >Profile Settings</ModalHeader>

                <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

                <ModalBody>
                  
                </ModalBody>

                <ModalFooter>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </div>

          <div className="flex justify-between mt-3 dark:text-white text-white ">
            <p className="text-lg dark:text-white text-black">{posts.length} posts</p>
            <FollowersModal user = {profileOwner} followers = {profileOwner?.followers} follower_count = {profileOwner?.follower_count} />
            <FollowingModal user = {profileOwner} following = {profileOwner?.followings} following_count = {profileOwner?.following_count} />
            {/* <button> <Text className="text-lg dark:text-white text-black"> {profileOwner?.following_count} following </Text> </button> */}
            {/* <button> <Text className="text-lg dark:text-white text-black"> {profileOwner?.following_count} following</Text> </button> */}
          </div>
        </div>
      </div>
      <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 mr-10 ml-10" />
      <div className=" mx-auto max-w-xl text-white">
        <div className="flex flex-col ">
          {posts.map(post => {
            return (
              <>
                <div className="mb-3 mt-3 dark:text-white text-black">
                  <ProfilePost key={post.id} post={post} />
                  <div className="flex justify-end">
                    <button>
                      <DeleteIcon className=" hover:text-red-500 hover:scale-125 transition duration-500" id={post.id} onClick={handleClick} />
                    </button>
                  </div>
                </div>
              </>
            )
          })}


        </div>
      </div>
    </>
  )
}