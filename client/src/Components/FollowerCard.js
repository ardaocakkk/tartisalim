import { useState, useEffect } from "react"
import { Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
export default function FollowerCard(props) {
    const [isMyProfile, setIsMyProfile] = useState(false)
    const [username, setUsername] = useState("")
    const [theUserName, setTheUserNAME] = useState("")
    const navigate = useNavigate()

    const getCurrentAuthenticatedUser = async () => {
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

        }
        else {
            setUsername(data.username)
            
        }

      };
      useEffect(() => {
        getCurrentAuthenticatedUser();
        if(props.theUser?.username === username){
            setIsMyProfile(true)
        }
      })


      const removeUserFromFollowers = async (usern) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ username: usern })
        }
        const response = await fetch(`http://localhost:8000/users/followers/${usern}`, requestOptions)
        const data = await response.json()
        if(!response.ok) {
            alert("Something went wrong")
        }else {
            alert('User removed from followers')
        }
      }

        function remove(usern) {
            removeUserFromFollowers(usern)
            navigate(0)
        }


    return (
        <>
            {props.followers.map((follower) => {
                return (
                    <div className="mt-3 mb-3">
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <img class="w-10 h-10 rounded-full mr-4 " src={follower.profile_img} alt="" />
                            <p>{follower.username}</p>
                        </div>
                        <div className='flex justify-end mr-4'>
                       {isMyProfile && <button onClick={() => remove(follower.username)} className="dark:bg-gray-700 rounded-lg bg-black hover:bg-gray-700 text-white  dark:hover:bg-main transition duration-300"> <Text className="ml-2 mr-2">Remove</Text> </button>}
                        </div>
                    </div>
                    </div>
                )
            })}
        </>
    )
}