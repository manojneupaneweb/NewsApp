import React, { useEffect, useState } from "react";
import { fetchPostsByCategory } from "../../../utils/Post.Fatching";
import moment from "moment";
const Opinion = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;

 useEffect(() => {
       const getTechnologyNews = async () => {
         try {
           const data = await fetchPostsByCategory("opinion", currentPage, postsPerPage);
           setPosts(data); 
           setTotalPosts(data.length); 
         } catch (error) {
           console.error("Failed to fetch Opinion news", error);
         }
       };
   
       getTechnologyNews();
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
    <section className="py-10 px-5 md:px-20">
      <h1 className="text-gray-700 font-bold text-3xl mb-5">राय समाचार</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-40 w-full rounded-lg mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 cursor-pointer mb-3">
                <a href={`/posts/${post._id}`}>{post.title}</a>
              </h3>
              <p>{post.description || "Brief description of the opinion piece"}</p>
              <p className="text-sm text-gray-500 mt-2">
                <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No opinion posts available.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="flex items-center text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Opinion;
