import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostsByCategory } from "../../utils/Post.Fatching.js";
import moment from "moment";
import Loading from "../../components/Loading.jsx";
import { FaClock } from "react-icons/fa";


function CategoryPage() {
  const { category } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await fetchPostsByCategory(category);
        setPost(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [category]);

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-white to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="font-bold text-2xl text-gray-900">
            <span className="text-orange-600">‘{category}’</span> Category Results
          </h2>
          <p className="text-gray-700 bg-orange-100 px-4 py-2 rounded-full font-semibold shadow-sm">
            {post.length} Posts Found
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-orange-50 border border-orange-200 hover:border-red-400 hover:text-red-700 px-5 py-2 rounded-xl transition-all duration-300 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">पछाडि जानुहोस्</span>
          </button>
        </div>

        {/* Post List */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {Array.isArray(post) && post.map((p) => (
            <div
              key={p._id}
              className="group flex flex-col sm:flex-row gap-5 p-6 border-b border-gray-100 hover:bg-orange-50/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-full sm:w-64 overflow-hidden rounded-xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 sm:h-44 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-orange-700 transition-colors duration-300">
                    <Link to={`/post/${p._id}`}>
                      {p.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {p.content.slice(0, 180)}...
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={p?.author?.profilePicture || '/default-avatar.png'}
                      alt="Author"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-medium">{p?.author?.name || 'अज्ञात लेखक'}</p>
                      <p className="text-gray-500">{p?.author?.role || ''}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1 text-gray-500">
                    <FaClock className="text-orange-500" />
                    {moment(p.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default CategoryPage;
