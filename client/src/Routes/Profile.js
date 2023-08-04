import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Post from "../Components/PostComponent";
import ProfilePost from "../Components/ProfilePost";
import { Text } from "@chakra-ui/react";
import NewPost from "../Components/newPost";
import FollowersModal from "../Components/FollowersModal";
import FollowingModal from "../Components/FollowingModal";
export default function Profile() {

    const { userName } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [profileOwner, setProfileOwner] = useState([]);
    const [isFollowing, setIsFollowing] = useState([]);

    console.log(profileOwner)
    const getProfile = async (name) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },


        }
        const response = await fetch(`http://localhost:8000/profile/${name}`, requestOptions);
        const data = await response.json();
        setPosts(data.posts)
        setProfileOwner(data.user)
        if (!response.ok) {
            navigate("/")
        } else {
            
        }

    }

    useEffect(() => {
        getProfile(userName);
    }, [])

    const isFollower = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      };
      const response = await fetch(`http://localhost:8000/users/isfollowing/${userName}`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        alert("Something went wrong")
      }else {
        setIsFollowing(data.is_following)
      }
    }

    useEffect( () => {
      isFollower();
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
      }else {
        
      }
    };
    useEffect(()=> {
      getCurrentUser();
    },[])



    const unFollowUser = async () => {
      const requestOptions = {
        method: 'DELETE',
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ username: profileOwner?.username })
      };
      const response = await fetch(`http://localhost:8000/users/following/${profileOwner?.username}`, requestOptions);
      const data = await response.json();
      if(!response.ok) {
        alert("Something went wrong")
      }
      else {
        setIsFollowing(false)
        navigate(0)
        
      }
      
    }

    const followUser = async () => {
      const requestOptions = {
        methd: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      };
      const response = await fetch(`http://localhost:8000/users/follow/${profileOwner?.username}`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        alert("Something went wrong")
      }else {
        setIsFollowing(true)
        navigate(0)
        
      }
    }




    return (
        <>
            <Sidebar />
            <div className="mx-auto max-w-xl dark:bg-post  dark:text-white p-10 mb-10 rounded-lg">
        <div className="flex flex-col ">
        <div className="flex justify-between"> 
        <div className="flex">
        <img class="w-10 h-10 rounded-full mr-4" src={profileOwner?.profile_image}  alt="" />
        <p> {profileOwner?.username} </p>
        </div>
        {isFollowing
          ? <button onClick={unFollowUser} className="bg-gray-700 rounded-lg dark:hover:bg-main transition duration-300"> <Text className="ml-2 mr-2">  Unfollow  </Text> </button>
          : <button onClick={followUser} className="bg-gray-700 rounded-lg dark:hover:bg-main transition duration-300"> <Text className="ml-2 mr-2">  Follow  </Text> </button>
        
        }

        </div>

        <div className="flex justify-between mt-3 text-black dark:text-white">
          <p>{posts.length} posts</p>
          <FollowersModal profileOwnerName = {profileOwner?.username} followers = {profileOwner?.followers} follower_count = {profileOwner?.follower_count} />
          <FollowingModal profileOwnerName = {profileOwner?.username} following = {profileOwner?.followings} following_count = {profileOwner?.following_count} />

        </div>
        </div>
      </div>
      <hr class=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 mr-10 ml-10" />
      <div className=" mx-auto max-w-xl text-white">
        <div className="flex flex-col ">
          {posts.map(post => {
            return (
              <>
              <div className="mb-3 mt-3">
                <ProfilePost key={post.id} post={post} profile_image = {profileOwner?.profile_image}  />
                <div className="flex justify-end">
                </div>
                </div>
              </>
            )
          })}


        </div>
      </div>
            {/* <div className="p-4 sm:ml-64 sm:mr-64 text-white">
                <p>{posts.map(post => {
                    return (
                        <Post key={post.id} post={post} />
                    )
                })}</p>
            </div> */}

        </>
    )




}