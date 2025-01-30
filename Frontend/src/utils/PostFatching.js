import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PostFatching() {
    const {post, setPost} = useState([]);
    const fatchPost =async()=>{
        const responce = await axios.get('/api/v1/posts');
        setPost(responce.data)
    }
    useEffect(()=>{
        fatchPost();
    })
  return (
   post
  )
}

export default PostFatching