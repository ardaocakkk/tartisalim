import { useState, useEffect } from "react"
import { Text } from "@chakra-ui/react"

export default function FollowingCard(props) {


    const [isMyProfile, setIsMyProfile] = useState(false)
    const [username, setUsername] = useState("")

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


      const unFollowUser = async (usern) => {
        const requestOptions = {
          method: 'DELETE',
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ username: usern })
        };
        const response = await fetch(`http://localhost:8000/users/following/${usern}`, requestOptions);
        const data = await response.json();
        if(!response.ok) {
          alert("Something went wrong")
        }
        else {
          
        }
        
      }


      function unfollow(usern) {
        unFollowUser(usern)
        window.location.reload()
      }


      console.log(props.following)





    return (
        <>
            {props.following.map((f) => {
                return (
                    <div className="mt-3 mb-3">
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <img class="w-10 h-10 rounded-full mr-4 " src={f.profile_img} alt=""  />
                                <p>{f.username}</p>
                            </div>
                            <div className='flex justify-end mr-4'>

                                {isMyProfile && <button onClick={() => unfollow(f.username)} className="dark:bg-gray-700 rounded-lg bg-black hover:bg-gray-700 text-white  dark:hover:bg-main transition duration-300"> <Text className="ml-2 mr-2">Unfollow</Text> </button>}

                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}