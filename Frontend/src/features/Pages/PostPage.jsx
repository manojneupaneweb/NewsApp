import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostById } from "../../utils/Post.Fatching.js";
import Advertisement from "../../components/advertisement";
import moment from "moment";
import { FaClock, FaFacebookF, FaTwitter, FaWhatsapp, FaTag } from "react-icons/fa";
import Loading from "../../components/Loading.jsx";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [relatedPost, setRelatedPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(postId);
        setPost(data.post);
        setRelatedPost(data.relatedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const getTags = () => {
    if (!post.tags) return [];
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags === 'string') return post.tags.split(',').map(tag => tag.trim());
    return [];
  };

  const shareOnSocialMedia = (platform) => {
    const url = window.location.href;
    const title = post.title || '';

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => window.history.back()}
            className="hover:text-red-800 font-medium flex items-center bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 hover:border-red-300 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">पछाडि जानुहोस्</span>
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={post?.author?.profilePicture || '/default-avatar.png'}
                  alt="Author Profile"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {post?.author?.name || "अज्ञात लेखक"}
                </h3>
                <p className="text-xs text-gray-600">
                  {post?.author?.role || ""}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaClock className="inline mr-2 text-red-500" />
              {moment(post.createdAt).fromNow()}
            </div>
          </div>

          {post.image && (
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden cursor-pointer mb-6 rounded-lg border-2 border-white shadow-lg relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {post.category && (
              <span className="self-start px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-md hover:scale-105 transform transition-all duration-300">
                <Link to={`/post/category/${post.category}`}>
                  {post.category}
                </Link>
              </span>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold text-sm shadow-sm">
                <FaTag className="w-3 h-3" />
                Tags
              </div>
              {getTags().map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md cursor-pointer hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transform transition-all duration-300"
                >
                  <Link to={`/post/tag/${tag.slice(2, tag.length - 2)}`}>
                    {tag.slice(2, tag.length - 2)}
                    </Link>
                  </span>
                ))}
            </div>
          </div>

          <div className="prose max-w-none text-gray-800 mb-8 leading-relaxed text-base sm:text-lg">
            {post.content &&
              post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-justify">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">यो समाचार साझा गर्नुहोस्</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => shareOnSocialMedia('facebook')}
                className="group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Facebook</span>
              </button>
              <button
                onClick={() => shareOnSocialMedia('twitter')}
                className="group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Twitter</span>
              </button>
              <button
                onClick={() => shareOnSocialMedia('whatsapp')}
                className="group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-lg">
              <Advertisement />
            </div>
          </div>

          <div className="px-4 sm:px-8 py-6 bg-gradient-to-r from-gray-50 to-orange-50 border-t border-gray-200 rounded-lg">
            <div className="flex justify-center gap-2 mb-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <p className="text-center text-gray-600 text-xs sm:text-sm font-medium">
              यो समाचार {new Date(post.createdAt).toLocaleDateString('ne-NP')} मा प्रकाशित भएको हो
            </p>
          </div>

          <div className="my-8">
            <h1 className="font-bold text-xl sm:text-2xl text-center mb-5">Related News</h1>
            {Array.isArray(relatedPost) && relatedPost.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPost.map((rpost) => (
                  <div
                    key={rpost._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <img
                      src={rpost.image}
                      alt={rpost.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="font-bold text-sm sm:text-base text-center hover:text-blue-800 transition-colors duration-300 line-clamp-2">
                        <Link to={`/post/${rpost._id}`}>
                          {rpost.title}
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No Related Posts Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;