import { useNavigate } from "react-router-dom"

export default function Table(props) {
    const navigate = useNavigate()
    console.log(props?.users)
    const navigateToUserProfile = (username) => {
        navigate(`/profile/${username}`)
    }
    return (
        <>
        {props.users?.map((user) => {
            return (
                <tr key={user?.id}>
                    <img src={user?.profile_img} alt={user?.username} className="w-10 h-10 rounded-full" onClick={() => navigateToUserProfile(user?.username)} />
                    <td className="mb-3">{user?.username}</td>
                </tr>
            )  
        })}
        </>
    )
}