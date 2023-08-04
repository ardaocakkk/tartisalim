import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function NewPost() {

  const navigate = useNavigate();
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

  return (
    <form onSubmit={formik.handleSubmit}>

      <label>
        Create a Post
        <textarea
          name="post_body"
          defaultValue=""
          rows={4}
          cols={40}
          onChange={formik.handleChange}
          value={formik.values.post_body}
          className="dark:bg-gray-800 w-full"
          style={{ resize: 'none' }}
        />
      </label>
      <hr />
      <button type="submit">Post</button>
    </form>
  );
}