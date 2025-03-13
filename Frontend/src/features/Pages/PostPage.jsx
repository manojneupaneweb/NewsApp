import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../utils/Post.Fatching.js";
import Advertisement from "../../components/advertisement";
import { getUserById } from "../../utils/User.Fetching.js";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState(null); // State for author info

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

  useEffect(() => {
    if (post.userId) {
      const fetchUser = async () => {
        try {
          const data = await getUserById(post.userId);
          setAuthor(data);
        } catch (error) {
          console.error("Error fetching author:", error);
        }
      };

      fetchUser();
    }
  }, [post.userId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight border-b-2 pb-2">
        {post.title}
      </h1>

      {/* Advertisement */}
      <div className="mb-4">{Advertisement}</div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed mb-6 text-lg space-y-4">
        {post.content &&
          post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="relative pl-6">
              <span className="absolute left-0 top-1 text-blue-600 font-extrabold">|</span> {paragraph}
            </p>
          ))}
      </div>

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

      {/* Opinion Section */}
      {post.opinion && post.opinion.length > 0 && (
        <div className="border-t pt-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔹 Opinion</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {post.opinion.map((op, index) => (
              <li key={index}>{op}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Author Info */}
      {author && (
        <div className="mt-6 border-t pt-4 text-gray-500 text-sm italic">
          <strong>By:</strong> {author.name} | 🆔 {author.id}
        </div>
      )}
    </div>
  );
}

export default PostPage;
