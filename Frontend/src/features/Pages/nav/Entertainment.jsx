import React, { useEffect, useState } from "react";
import { fetchPostsByCategory } from "../../../utils/Post.Fatching";
import Loading from "../../../components/Loading";

const Entertainment = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEntertainmentNews = async () => {
      try {
        const data = await fetchPostsByCategory("entertainment", currentPage, postsPerPage);
        setPosts(data.posts); // Assuming data contains 'posts' array
        setTotalPosts(data.totalPosts); // Assuming data contains 'totalPosts'
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch entertainment news", error);
      }
    };

    getEntertainmentNews();
  }, [currentPage]);

  // Calculate total pages
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
    <section className="py-10 px-5 md:px-20">
      <h1 className="text-purple-700 font-bold text-3xl mb-5">मनोरंजन समाचार</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-40 w-full rounded-lg mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg text-purple-600 hover:text-purple-800 cursor-pointer mb-3">
                <a href={`/posts/${post._id}`}>{post.title}</a>
              </h3>
              <p>{post.description || "Brief description of the entertainment news"}</p>
              <p className="text-sm text-gray-500 mt-2">
                <i className="far fa-clock"></i> {post.timeAgo}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No entertainment news available.</p>
        )}
      </div>

      {/* Pagination */}
      {/* <div className="mt-10 flex justify-center gap-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-purple-500 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="flex items-center text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-purple-500 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div> */}
    </section>
      )}
    </>
  );
};

export default Entertainment;
