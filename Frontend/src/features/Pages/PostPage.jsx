import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../utils/Post.Fatching.js";
import Advertisement from "../../components/advertisement";
import { getUserById } from "../../utils/User.Fetching.js";
import moment from "moment";
import { FaClock, FaHeart, FaComment, FaShare, FaBookmark } from "react-icons/fa";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(postId);
        console.log("Fetched Post Data:", data);
        
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);


  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Safely get tags as an array
  const getTags = () => {
    if (!post.tags) return [];
    
    // If tags is already an array, return it
    if (Array.isArray(post.tags)) return post.tags;
    
    // If tags is a string, split by comma
    if (typeof post.tags === 'string') return post.tags.split(',').map(tag => tag.trim());
    
    // For any other case, return empty array
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()} 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Author section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={post?.author?.profilePicture || '/default-avatar.png'}
                  alt="Author Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {post && post.author ? post.author.name : "Unknown Author"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post && post.author ? post.author.role : ""} • <FaClock className="inline mr-1" /> {moment(post.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleBookmark}
                  className={`p-2 rounded-full ${isBookmarked ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                >
                  <FaBookmark />
                </button>
              </div>
            </div>
          </div>

          {/* Post image */}
          {post.image && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Content section */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              )}
              {getTags().map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose max-w-none text-gray-700 mb-6">
              {post.content &&
                post.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Opinion Section */}
            {post.opinion && Array.isArray(post.opinion) && post.opinion.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-5 mb-6 border-l-4 border-blue-500">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Key Insights
                </h2>
                <ul className="space-y-2">
                  {post.opinion.map((op, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{op}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Advertisement */}
            <div className="mb-6">
              <Advertisement />
            </div>

            {/* Engagement buttons */}
            <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              >
                <FaHeart className="text-lg" />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                <FaComment className="text-lg" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                <FaShare className="text-lg" />
                <span>Share</span>
              </button>
            </div>

            {/* Author bio at bottom */}
            {author && author.bio && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">About the author</h3>
                <p className="text-gray-600">{author.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;