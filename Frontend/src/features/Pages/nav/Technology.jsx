import { useEffect, useState } from "react";
import { fetchPostsByCategory } from "../../../utils/Post.Fatching";
import moment from "moment";
import Loading from "../../../components/Loading";

const Technology = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTechnologyNews = async () => {
      try {
        const data = await fetchPostsByCategory("technology", currentPage, postsPerPage);
        setPosts(data);
        setTotalPosts(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch technology news", error);
        setLoading(false);
      }
    };

    getTechnologyNews();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 text-sm border rounded ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      ) : (
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-blue-600 font-bold text-2xl sm:text-3xl lg:text-4xl mb-6 flex items-center gap-3">
              <i className="fas fa-laptop-code"></i>
              प्रौद्योगिकी समाचार
            </h1>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                        Technology
                      </span>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2 mb-3">
                        <a href={`/post/${post._id}`} className="hover:underline">
                          {post.title}
                        </a>
                      </h2>
                      
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                        {post.content?.slice(0, 100) + "..." || "प्रौद्योगिकी समाचारको संक्षिप्त विवरण"}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A9 9 0 1118.364 4.56M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>

                          <img
                            src={post.author?.profilePicture}
                            className="w-8 h-8 object-cover rounded-full border-2 border-gray-200"
                            alt={post.author?.name}
                          />
                          <p className="text-sm text-gray-700 font-medium">
                            {post.author?.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <i className="far fa-clock"></i>
                          {moment(post.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                  <i className="far fa-newspaper"></i>
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  हाल प्रौद्योगिकी समाचार उपलब्ध छैन।
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  पृष्ठ {currentPage} of {totalPages} - कुल {totalPosts} समाचार
                </div>
                
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <i className="fas fa-chevron-left text-xs"></i>
                    अघिल्लो
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {renderPaginationButtons()}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    अर्को
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Technology;