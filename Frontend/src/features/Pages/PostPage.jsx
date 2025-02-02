import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostById } from '../../utils/PostFatching'

function PostPage() {
  const { postId } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(postId);
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }

    fetchPost()
  }, [postId])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-4 border border-blue-600" />
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.category && <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">{post.category}</span>}
        {post.tags && <span className="px-3 py-1 bg-green-500 text-white rounded-md text-sm">{post.tags}</span>}
      </div>

      {post.author && (
        <p className="text-gray-500 text-sm italic">
          <strong>By:</strong> {post.author}
        </p>
      )}
    </div>
  )
}

export default PostPage
