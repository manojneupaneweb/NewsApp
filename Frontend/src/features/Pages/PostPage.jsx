import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../utils/Post.Fatching.js";
import Advertisement from "../../components/advertisement";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(postId);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Post Image */}
      {post.image && (
        <div className="mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 object-cover rounded-lg shadow-md border border-blue-600 hover:shadow-xl transition-all duration-300"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      {/* Advertisement */}
      <div className="mb-4">{Advertisement}</div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
        {post.content}
      </p>

      {/* Tags & Category */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.category && (
          <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold">
            {post.category}
          </span>
        )}
        {post.tags && (
          <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold">
            {post.tags}
          </span>
        )}
      </div>

      {/* Author Info */}
      {post.author && (
        <p className="text-gray-500 text-sm italic border-t pt-4">
          <strong>By:</strong> {post.author}
        </p>
      )}
    </div>
  );
}

export default PostPage;
