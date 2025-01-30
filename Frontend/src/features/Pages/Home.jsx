import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo JPEG.jpg";
import axios from 'axios';
import moment from "moment";

 function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/v1/posts/getallposts");
                setPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main>
            {/* Categories Section */}
            <section className="bg-slate-100 py-4 px-5 md:px-20">
                <div className="flex flex-wrap gap-4 justify-center">
                    {["World", "Finance", "Technology", "Business", "Entertainment", "Sports", "Health", "Science", "Travel", "Opinion"].map((category) => (
                        <p
                            key={category}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-md hover:bg-blue-200 cursor-pointer transition duration-200"
                        >
                            {category}
                        </p>
                    ))}
                </div>
            </section>

            {/* Marquee Section */}
            <div>
                <marquee
                    className="text-blue-700 font-semibold bg-slate-50 p-2 rounded-md mx-5"
                    direction="left"
                    scrollamount="8"
                    onMouseOver={(e) => e.target.stop()}
                    onMouseOut={(e) => e.target.start()}
                >
                    नेपालले आफ्नो शिक्षा प्रणालीमा प्रविधि समावेश गर्ने दिशामा महत्त्वपूर्ण कदम चालेको छ।
                </marquee>
            </div>

            {/* Headline Section */}
            <section className="py-10 px-5 md:px-20">
                {posts.slice(0, 2).map((post) => (
                    <div key={post._id} className="py-10 px-5 md:px-20 text-center">
                        <h1 className="text-2xl md:text-4xl text-blue-900 font-bold hover:text-blue-700 cursor-pointer">
                            {post.title}
                        </h1>
                        <div className="flex justify-center items-center mt-5">
                            <img
                                src={logo} // Use actual author image here
                                alt="Author"
                                className="h-12 w-12 rounded-full border-2 border-blue-600"
                            />
                            <p className="ml-3 text-gray-600">
                                <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* News Section */}
            <section>
                <div className="py-10 px-5 md:px-20 flex flex-col md:flex-row gap-10">
                    {posts.slice(0, 2).map((post) => (
                        post.category === "Sports" && (
                            <>
                                {/* Main Story */}
                                <div className="w-full md:w-2/3 relative">
                                    <img
                                        src="https://example.com/sport-main-image.jpg"  // Replace with actual image URL
                                        alt="Sports News"
                                        className="rounded-lg w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-end p-5 rounded-lg">
                                        <h2 className="text-white font-bold text-xl md:text-3xl">
                                            {post.title}
                                        </h2>
                                        <div className="flex items-center mt-3">
                                            <img
                                                src={logo}  // Replace with dynamic author image if needed
                                                alt="Author"
                                                className="h-12 w-12 rounded-full border-2 border-blue-600"
                                            />
                                            <p className="ml-3 text-white">
                                                <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Stories */}
                                <div className="w-full md:w-1/3 overflow-y-scroll">
                                    {posts.slice(0, 4).map((sidebarPost, index) => (
                                        <div key={index} className="flex mb-5">
                                            <div className="h-20 w-20 bg-gray-300 rounded-lg mr-3">
                                                <img
                                                    src={sidebarPost.image || "default-sport-image.jpg"}  // Replace with actual image URL
                                                    alt="Sport Thumbnail"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                            <p className="text-gray-700">
                                                {sidebarPost.description || "Short description of the sports news"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    ))}
                </div>
            </section>
            {/* Health Section */}
            <section className="py-10 px-5 md:px-20 bg-gray-100">
                <h1 className="text-green-700 font-bold text-3xl mb-6">स्वास्थ्य समाचार</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.slice(0, 4).map((post) => (
                        <div key={post._id} className="flex flex-col bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105">
                            <img
                                src={post.image || "https://via.placeholder.com/200"} // Use actual image if available
                                alt="Health Thumbnail"
                                className="h-40 w-full rounded-lg mb-4 object-cover"
                            />
                            <h2 className="font-semibold text-xl text-green-600 hover:text-green-800 cursor-pointer mb-3">
                                {post.title || "Default Health Title"}
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                {post.description || "Short description of the health news."}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <img
                                    src={post.author.profilePicture || "https://via.placeholder.com/50"} // Author image
                                    alt="Author"
                                    className="h-10 w-10 rounded-full border-2 border-green-600"
                                />
                                <p className="text-gray-500 text-xs">
                                    <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Business Section */}
            <section className="py-10 px-5 md:px-20">
                <h1 className="text-blue-700 font-bold text-3xl mb-5">व्यापार समाचार</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {posts.slice(0, 4).map((post) => (
                        <div key={post._id} className="flex bg-slate-50 p-4 rounded-lg shadow-lg">
                            <img
                                src={post.image || "https://via.placeholder.com/100"} // Replace with actual image URL
                                alt="Business Thumbnail"
                                className="h-24 w-24 rounded-lg mr-4"
                            />
                            <div className="text-gray-700">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                <p>{post.description || "Brief description of the business news"}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Travel Section */}
            <section className="py-10 px-5 md:px-20 bg-gray-50">
                <h1 className="text-indigo-700 font-bold text-3xl mb-5">यात्रा समाचार</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.slice(0, 4).map((post) => (
                        <div key={post._id} className="flex flex-col bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105">
                            <img
                                src={post.image || "https://via.placeholder.com/200"} // Use actual image if available
                                alt="Travel Thumbnail"
                                className="h-40 w-full rounded-lg mb-4 object-cover"
                            />
                            <h2 className="font-semibold text-xl text-indigo-600 hover:text-indigo-800 cursor-pointer mb-3">
                                {post.title || "Default Travel Title"}
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                {post.description || "Short description of the travel news."}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <img
                                    src={post.author.profilePicture || "https://via.placeholder.com/50"} // Author image
                                    alt="Author"
                                    className="h-10 w-10 rounded-full border-2 border-indigo-600"
                                />
                                <p className="text-gray-500 text-xs">
                                    <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
           


            {/* Opinion Section */}
            <section className="py-10 px-5 md:px-20">
                <h1 className="text-gray-700 font-bold text-3xl mb-5">राय समाचार</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {posts.slice(0, 4).map((post) => (
                        <div key={post._id} className="flex bg-slate-50 p-4 rounded-lg shadow-lg">
                            <img
                                src={post.image || "https://via.placeholder.com/100"} // Replace with actual image URL
                                alt="Opinion Thumbnail"
                                className="h-24 w-24 rounded-lg mr-4"
                            />
                            <div className="text-gray-700">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                <p>{post.description || "Brief description of the opinion piece"}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Advertisement Section */}
            <div className="py-10 bg-gray-100 text-center">
                <p className="text-lg font-bold text-gray-700">Advertisement</p>
            </div>

            
        </main>
    )
};
 export default Home;
