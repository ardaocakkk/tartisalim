import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import SendIcon from '@mui/icons-material/Send';

export default function NewComment(props) {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      comment_body: "",
      post_id: props.post_id
    },
    onSubmit: (values) => {
      if ((values.comment_body === "" || values.comment_body === null)) {
        alert("Post body cannot be empty")
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

  return (
    <form onSubmit={formik.handleSubmit}>
                <div class="font-bold max-w-lg mx-auto flex w-full   text-xl mb-2 mt-3">
                  <div className='flex w-full'>
                    <img class=" h-10 w-10 rounded-full mr-4 cursor-pointer" src={props.current_user.profile_img} alt=""  />
                      <div className="w-full ">
                         <Input className="w-full dark:text-white h-full bg-gray-300  dark:bg-gray-600 rounded-lg hover:dark:bg-gray-400 transition duration-300 " name="comment_body" placeholder="make a comment" onChange={formik.handleChange} value={formik.values.comment_body} />
                    </div>
                    <Button className="dark:text-white ml-2"  type="submit" >
            <SendIcon className="hover:text-blue-400 hover:scale-125 transition duration-500" />
          </Button>
                    
                  </div>
                </div>

      {/* <div class=" border-t-2 md:border-t-2  border-gray-200 dark:border-white dark:bg-gray-800 dark:text-white">
        <div className="flex">
          <textarea name="comment_body" className="dark:bg-gray-800 w-full" style={{ resize: 'none' }} placeholder="Post your comment" onChange={formik.handleChange} value={formik.values.comment_body} ></textarea>
          <Button colorScheme="blue" type="submit" >
            <SendIcon className="hover:text-blue-400 hover:scale-125 transition duration-500" />
          </Button>
        </div>
      </div> */}
    </form>
  );
}