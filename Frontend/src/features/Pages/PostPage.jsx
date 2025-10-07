import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../utils/Post.Fatching.js";
import Advertisement from "../../components/advertisement";
import moment from "moment";
import { FaClock, FaFacebookF, FaTwitter, FaWhatsapp, FaTag } from "react-icons/fa";
import Loading from "../../components/Loading.jsx";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await fetchPostById(postId);
        console.log("Fetched Post Data:", data);
        setPost(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // Load Google Adsense script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1768695147999773';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
    };
  }, []);

  useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  const getTags = () => {
    if (!post.tags) return [];
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags === 'string') return post.tags.split(',').map(tag => tag.trim());
    return [];
  };

  const shareOnSocialMedia = (platform) => {
    const url = window.location.href;
    const title = post.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-4 px-4 sm:px-6 lg:px-8">
      {/* Nepali Pattern Header */}
      <div className="max-w-4xl mx-auto mb-6 relative">
        <div className="rounded-t-xl h-2"></div>
        <div className="bg-white rounded-b-xl shadow-lg">
          {/* Back Button with Nepali Style */}
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={() => window.history.back()}
              className=" hover:text-red-800 font-medium flex items-center bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 hover:border-red-300 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">पछाडि जानुहोस्</span>
            </button>
          </div>

          {/* News Content */}
          <div className="p-6">
            {/* Title with Nepali Flag Colors */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight font-sans"
            >
              {post.title}
            </h1>

            {/* Author and Date Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 p-4 ">
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div className="relative">
                  <img
                    src={post?.author?.profilePicture || '/default-avatar.png'}
                    alt="Author Profile"
                    className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-900 ">
                    {post && post.author ? post.author.name : "अज्ञात लेखक"}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    {post && post.author ? post.author.role : ""}
                  </p>

                </div>
              </div>
              <div>
                <FaClock className="inline mr-1 text-red-500" />
                {moment(post.createdAt).fromNow()}
              </div>


            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="w-full h-64 md:h-96 overflow-hidden cursor-pointer mb-6 rounded-lg border-4 border-white shadow-lg relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-sm transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            )}

            {/* Categories and Tags */}
            <div className="flex  gap-4 mb-6">
              {post.category && (
                <span className="self-start px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-md hover:scale-105 transform transition-all duration-300">
                  {post.category}
                </span>
              )}

              <div className="flex flex-wrap items-center gap-2   rounded-2xl">
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold text-sm shadow-sm">
                  <FaTag className="w-4 h-4" />
                  Tags
                </div>
                {getTags().map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md cursor-pointer hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transform transition-all duration-300"
                  >
                    {tag.slice(2, tag.length - 2)}
                  </span>
                ))}
              </div>
            </div>


            {/* News Content */}
            <div className="prose max-w-none text-gray-800 mb-8 leading-relaxed text-lg">
              {post.content &&
                post.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-justify">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Google Adsense - After Content Ad */}
            <div className="mb-8">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1768695147999773"
                data-ad-slot="7263404856"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            {/* Key Insights with Nepali Design */}
            {post.opinion && Array.isArray(post.opinion) && post.opinion.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 mb-8 border-l-8 border-red-500 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  मुख्य बुँदाहरू
                </h2>
                <ul className="space-y-3">
                  {post.opinion.map((op, index) => (
                    <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{op}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Social Sharing */}
            <div className="my-10 p-8 bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">यो समाचार साझा गर्नुहोस्</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <FaFacebookF className="w-5 h-5" />
                  <span className="font-medium">Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="group flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <FaTwitter className="w-5 h-5" />
                  <span className="font-medium">Twitter</span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="group flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span className="font-medium">WhatsApp</span>
                </button>
              </div>
            </div>


            {/* Advertisement Component */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-lg">
                <Advertisement />
              </div>
            </div>


            {/* Google Adsense - Bottom Ad */}
            <div className="mb-8">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1768695147999773"
                data-ad-slot="7263404856"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            {/* Footer */}
            <div className="px-8 py-8 bg-gradient-to-r from-gray-50 to-orange-50 border-t border-gray-200">
              <div className="flex justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
              <p className="text-center text-gray-600 text-sm font-medium">
                यो समाचार {new Date(post.createdAt).toLocaleDateString('ne-NP')} मा प्रकाशित भएको हो
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Google Adsense - Top Ad */}
      <div className="max-w-4xl mx-auto mb-6">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1768695147999773"
          data-ad-slot="7263404856"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Script to initialize ads */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `
      }} />
    </div>
  );
}

export default PostPage;