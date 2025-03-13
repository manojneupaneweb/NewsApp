import React, { useEffect, useState } from "react";
import { fetchPostsByCategory } from "../../../utils/Post.Fatching"; // Adjust this import based on your project structure
import moment from "moment"; // Make sure moment.js is imported
import Loading from "../../../components/Loading.jsx";

const Business = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6; // Number of posts per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTechnologyNews = async () => {
      try {
        const data = await fetchPostsByCategory("Business", currentPage, postsPerPage);
        setPosts(data);
        setLoading(false);
        setTotalPosts(data.length);
      } catch (error) {
        console.error("Failed to fetch Business news", error);
      }
    };

    getTechnologyNews();
  }, [currentPage]);

  // Pagination calculation
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>    {
      loading ? (
        <div className='flex items-center justify-center h-[80vh]'>
          <Loading />
        </div>
      ) : (
        <section className="py-10 px-5 md:px-20 bg-gray-100">
          <h1 className="text-blue-500 font-bold text-3xl mb-6 flex items-center gap-3">
            <i className="fas fa-laptop-code"></i> ब्यापार  समाचार
          </h1 >

          {
            posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transform transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-48 w-full rounded-lg object-cover brightness-75"
                      />
                      <span className="absolute top-2 right-2 bg-blue-500 text-black text-xs px-3 py-1 rounded-full">
                        Business
                      </span>
                    </div>
                    <h2 className="text-blue-500 font-semibold text-xl mt-4 hover:text-blue-400 cursor-pointer">
                      <a href={`/posts/${post._id}`}>{post.title}</a>
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">
                      {post.description || "प्रौद्योगिकी समाचारको संक्षिप्त विवरण"}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-gray-500 text-xs">
                        <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg mt-10">हाल प्रौद्योगिकी समाचार उपलब्ध छैन।</p>
            )
          }

          {/* Pagination */}
          {
            totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-600"
                >
                  Previous
                </button>
                <span className="text-white">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-600"
                >
                  Next
                </button>
              </div>
            )
          }
        </section >
      )}
    </>

  );
};

export default Business;
