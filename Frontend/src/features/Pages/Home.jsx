import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo JPEG.jpg";
import moment from "moment";
import Advertisement from '../../components/advertisement';
import { fetchAllPosts } from '../../utils/Post.Fatching';
import Newsletter from '../../components/Newsletter.jsx';
import Loading from '../../components/Loading.jsx';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetchAllPosts();
                setPosts(response.posts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const [visible, setVisible] = useState(() => {
        return localStorage.getItem('disclaimerSeen') !== 'true';
    });

    const handleClose = () => {
        setVisible(false);
        localStorage.setItem('disclaimerSeen', 'true'); // Mark as seen
    };

    return (
<<<<<<< HEAD
         <>
        {loading ? (
           <>
            <div className='w-screen h-60 bg-slate-200 flex items-center justify-center'>
            <h1 className='text-2xl h-1/2 text-black'>Loading....</h1>
            </div>
            </>
        ):(
        <main>
            {visible && (
                <section className="Disclaimer">
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
                        aria-hidden="true"
                    >
                        <div className=" bg-gradient-to-tl from-white via-gray-100 to-gray-200 text-gray-800 px-8 py-8 rounded-lg shadow-xl relative w-11/12 h-80 sm:w-2/3 md:w-1/2 transition-all duration-500 scale-100 animate-fadeIn">
                            <h2 className="font-extrabold text-2xl text-center text-red-600">📢 Disclaimer</h2>
                            <p className="text-lg mt-4 text-center font-medium">
                                This news has not been verified from any official source. <br />
                                It is created solely for educational purposes. Please refer to official sources for information. <br />
                                We will not be responsible for any legal issues that may arise.
                            </p>
                            <p className="mt-4 mb-6 text-center">
                                Contact:{" "}
                                <a
                                    href="https://manoj-neupane.com.np"
                                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
=======
        <>
            {loading ?(
                <div className='flex items-center justify-center h-[80vh]'>
                <Loading />                
                </div>
            ): ( 
            <main>
                {visible && (
                    <section className="Disclaimer">
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
                            aria-hidden="true"
                        >
                            <div className=" bg-gradient-to-tl from-white via-gray-100 to-gray-200 text-gray-800 px-8 py-8 rounded-lg shadow-xl relative w-11/12 h-80 sm:w-2/3 md:w-1/2 transition-all duration-500 scale-100 animate-fadeIn">
                                <h2 className="font-extrabold text-2xl text-center text-red-600">📢 Disclaimer</h2>
                                <p className="text-lg mt-4 text-center font-medium">
                                    This news has not been verified from any official source. <br />
                                    It is created solely for educational purposes. Please refer to official sources for information. <br />
                                    We will not be responsible for any legal issues that may arise.
                                </p>
                                <p className="mt-4 mb-6 text-center">
                                    Contact:{" "}
                                    <a
                                        href="https://manoj-neupane.com.np"
                                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Manoj Neupane
                                    </a>
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="font-semibold bg-gray-300 py-3 px-8 rounded-xl text-red-800 hover:bg-gray-200 transition-all duration-300"
>>>>>>> 3cf05e8 (loading add in page)
                                >
                                    OK, Understand
                                </button>
                            </div>
                        </div>
                    </section>


                )}

                {/* Marquee Section */}
                <div>
                    <marquee
                        className="text-blue-700 font-semibold bg-slate-50 p-2 rounded-md mx-5"
                        direction="left"
                        scrollamount="8"
                        onMouseOver={(e) => e.target.stop()}
                        onMouseOut={(e) => e.target.start()}
                    >
                        भारत, उत्तर प्रदेशको प्रयागराजमा लागेको महाकुम्भ मेलामा सहभागी भएर फर्किँदै गरेको गाडी दुर्घटनामा पर्दा ५ जना नेपालीको मृत्यु भएको छ । मृतक ५ जना महोत्तरी जिल्लाको रहेको नेपाल प्रहरीले जनाएको छ ।
                        कुम्भ मेलाबाट ९ जना नेपाली बोकेर फर्किरहेको भारतीय नम्बर बीआर ३२ पीए ४६६१ नम्बरको स्कर्पियो गाडी बिहारको मुज्जफरपुरमा साइकललाई बचाउने क्रममा अनियन्त्रित भएर सडकमा बजारिँदा ५ जना नेपाली नागरिकको मृत्यु भएको छ ।
                    </marquee>
                </div>

                {/* Headline Section */}
                <section className=" px-5 my-10 md:px-20">
                    {posts.slice(0, 2).map((post) => (
                        <div key={post._id} className="py-5 px-5 md:px-20 text-center">
                            <a target='blank' href={`/post/${post._id}`}>
                                <h1 className="text-6xl md:text-6xl text-blue-900 font-bold hover:text-blue-700 cursor-pointer">
                                    {post.title}
                                </h1>
                            </a>
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

                {/* add section */}
                <div className="bg-stone-200 py-5 w-2/3 mx-auto flex items-center justify-center">
                    <Advertisement />
                </div>
                <section className="my-10 px-4 md:px-10">
                    {posts.slice(3, 4).map((post) => (
                        <div key={post._id} className="w-full mt-5 md:w-2/3 mx-auto border-b border-gray-300 pb-10">
                            <h1 className="text-6xl mb-2 text-center text-blue-900 font-bold hover:text-blue-700 cursor-pointer">
                                {post.title}
                            </h1>
                            <img
                                src={post.image}
                                alt={post.title}
                                className="rounded-lg bg-slate-100 w-full h-72 md:h-96 object-cover cursor-pointer"
                            />
                            <div className='text-center my-10'>
                                <p>
                                    {post.content.split(" ").length > 30
                                        ? post.content.split(" ").slice(0, 30).join(" ") + "..."
                                        : post.content}
                                </p>
                            </div>

                        </div>
                    ))}
                </section>

                <section className="py-10 px-5 bg-gray-50 md:px-20 my-10 flex flex-col md:flex-row gap-4">
                    {/* Main Story Section */}
                    <div className="relative md:w-2/3 mb-10 md:mb-0">
                        {posts.slice(4, 5).map((post) => (
                            <div key={post._id} className="relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-96 object-cover rounded-lg border-4 border-gray-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-5 rounded-lg">
                                    <h2 className="text-white text-lg md:text-3xl font-bold leading-snug">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-300 mt-2 text-sm">
                                        <i className="fa-regular fa-clock"></i> {post.timeAgo}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Side News List */}
                    <div className="flex flex-col gap-4 md:w-1/3  overflow-y-auto max-h-[380px]">
                        {posts.slice(0, 10).map((post) => (
                            <div key={post._id} className="flex gap-4">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-28 h-20 object-cover rounded-md border-2 border-gray-300"
                                />
                                <div className="flex flex-col justify-between">
                                    <h3 className="text-gray-800 font-semibold text-sm md:text-base">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs">
                                        <i className="fa-regular fa-clock"></i> {post.timeAgo}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* add section */}
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>

                {/* News Section */}
                <section className="py-5 px-5 md:px-20 bg-gray-50 border-b  border-gray-300 pb-10">
                    <h1 className="text-blue-700 font-bold text-3xl mb-6">समाचार</h1>
                    <div>
                        {posts.slice(5, 6).map((post) => (
                            <div
                                key={post._id}
                                className="bg-white py-2 px-3 rounded-sm shadow-sm flex gap-4"
                            >
                                {/* News Thumbnail */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-60 w-1/2 border border-1 rounded-lg mb-4 object-cover"
                                />
                                <div>
                                    <h2 className="font-semibold text-base text-black-600 hover:text-black-800 cursor-pointer mb-3">
                                        {post.title}
                                    </h2>
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  w-2/3 lg:grid-cols-2 gap-5">
                        {posts.slice(7, 15).map((post) => (
                            <div
                                key={post._id}
                                className="bg-white py-2 px-3 rounded-sm shadow-sm flex gap-4"
                            >
                                {/* News Thumbnail */}
                                <img
                                    src={post.image}
                                    // alt={post.title}
                                    className="h-20 w-40 border border-1 rounded-lg mb-4 object-cover"
                                />

                                {/* News Title */}
                                <h2 className="font-semibold text-base text-black-600 hover:text-black-800 cursor-pointer mb-3">
                                    <a target='blank' href={`/post/${post._id}`}>
                                        {post.title || "Default Health Title"}
                                    </a>
                                </h2>

                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>
                {/* Health Section */}
                <section className="py-10 px-5 md:px-20 bg-gray-100 border-b  border-gray-300 pb-10">
                    <h1 className="text-green-700 font-bold text-3xl mb-6"> स्वास्थ्य</h1>

                    {posts.filter((post) => post.category?.toLowerCase() === "health").length === 0 ? (
                        <p className="text-center text-gray-500 text-lg mt-10">हाल स्वास्थ्य सम्बन्धी कुनै समाचार उपलब्ध छैन।</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                            {posts
                                .filter((post) => post.category?.toLowerCase() === "health")
                                .slice(0, 4)
                                .map((post) => (
                                    <div key={post._id} className="flex flex-col bg-white p-6 rounded-lg shadow-xl">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-40 w-full rounded-lg mb-4 object-cover"
                                        />
                                        <h2 className="font-semibold text-xl text-green-600 hover:text-green-800 cursor-pointer mb-3">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {post.description || "Short description of the health news."}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={post.author.profilePicture}
                                                    alt="Author"
                                                    className="h-10 w-10 rounded-full border-2 border-green-600"
                                                />
                                                <span className="text-gray-700 text-sm">{post.author.name}</span>
                                            </div>
                                            <p className="text-gray-500 text-xs">
                                                <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </section>
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>
                {/* Business Section */}
                <section className="py-10 px-5 md:px-20 bg-gray-100 border-b  border-gray-300 pb-10">
                    <h1 className="text-blue-700 font-bold text-3xl mb-6">व्यापार समाचार</h1>

                    {posts.filter((post) => post.category?.toLowerCase() === "business").length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts
                                .filter((post) => post.category?.toLowerCase() === "business")
                                .slice(0, 4)
                                .map((post) => (
                                    <div key={post._id} className="bg-white p-5 rounded-lg shadow-lg flex flex-col">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-48 w-full rounded-lg object-cover mb-4"
                                        />
                                        <h2 className="text-blue-700 font-semibold text-xl mb-2 cursor-pointer hover:text-blue-900">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {post.description || " समाचारको संक्षिप्त विवरण"}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <p className="text-gray-500 text-xs">
                                                <i className="far fa-clock"></i> {moment(post.createdAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-10">हाल व्यापार सम्बन्धी कुनै समाचार उपलब्ध छैन।</p>
                    )}
                </section>
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>
                {/* Spotrs Secttion  */}
                <section className="py-10 px-5 md:px-20 bg-gray-50">
                    <h1 className="text-red-600 font-bold text-3xl mb-6 flex items-center gap-3">
                        <i className="fas fa-basketball-ball"></i> खेलकुद समाचार
                    </h1>

                    {posts.filter((post) => post.category?.toLowerCase() === "sports").length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts
                                .filter((post) => post.category?.toLowerCase() === "sports")
                                .slice(0, 6)
                                .map((post) => (
                                    <div
                                        key={post._id}
                                        className="bg-white p-5 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-48 w-full rounded-lg object-cover"
                                            />
                                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                                Sports
                                            </span>
                                        </div>
                                        <h2 className="text-red-700 font-semibold text-xl mt-4 hover:text-red-900 cursor-pointer">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {post.description || "खेलकुद समाचारको संक्षिप्त विवरण"}
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
                        <p className="text-center text-gray-500 text-lg mt-10">हाल खेलकुद सम्बन्धी कुनै समाचार उपलब्ध छैन।</p>
                    )}
                </section>
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>
                {/* Finance section  */}
                <section className="py-10 px-5 md:px-20 bg-gray-50">
                    <h1 className="text-blue-700 font-bold text-3xl mb-6 flex items-center gap-3">
                        <i className="fas fa-chart-line"></i> वित्तीय समाचार
                    </h1>

                    {posts.filter((post) => post.category?.toLowerCase() === "finance").length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts
                                .filter((post) => post.category?.toLowerCase() === "finance")
                                .slice(0, 6)
                                .map((post) => (
                                    <div
                                        key={post._id}
                                        className="bg-white p-6 rounded-lg shadow-lg border border-blue-200 transform transition-all hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-48 w-full rounded-lg object-cover"
                                            />
                                            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                                Finance
                                            </span>
                                        </div>
                                        <h2 className="text-blue-800 font-semibold text-xl mt-4 hover:text-blue-900 cursor-pointer">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {post.description || "वित्तीय समाचारको संक्षिप्त विवरण"}
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
                        <p className="text-center text-gray-500 text-lg mt-10">हाल वित्तीय सम्बन्धी कुनै समाचार उपलब्ध छैन।</p>
                    )}
                </section>
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>
                {/* Technology Section  */}
                <section className="py-10 px-5 md:px-20 bg-gray-900 text-white">
                    <h1 className="text-green-400 font-bold text-3xl mb-6 flex items-center gap-3">
                        <i className="fas fa-microchip"></i> प्रविधि समाचार
                    </h1>

                    {posts.filter((post) => post.category?.toLowerCase() === "technology").length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts
                                .filter((post) => post.category?.toLowerCase() === "technology")
                                .slice(0, 6)
                                .map((post) => (
                                    <div
                                        key={post._id}
                                        className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-all hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-48 w-full rounded-lg object-cover brightness-75"
                                            />
                                            <span className="absolute top-2 right-2 bg-green-500 text-black text-xs px-3 py-1 rounded-full">
                                                Tech
                                            </span>
                                        </div>
                                        <h2 className="text-green-400 font-semibold text-xl mt-4 hover:text-green-300 cursor-pointer">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {post.description || "प्रविधिसँग सम्बन्धित समाचारको संक्षिप्त विवरण"}
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
                        <p className="text-center text-gray-500 text-lg mt-10">
                            हाल प्रविधिसँग सम्बन्धित कुनै समाचार उपलब्ध छैन।
                        </p>
                    )}
                </section>


<<<<<<< HEAD
        </main >
    )}
    </>
=======
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>

                <Newsletter />

                {/* Opinion Section */}
                <section className="py-10 px-5 md:px-20 bg-gray-900 text-white">
                    <h1 className="text-green-400 font-bold text-3xl mb-6 flex items-center gap-3">
                        <i className="fas fa-comment-dots"></i> राय समाचार
                    </h1>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts
                                .slice(0, 6)
                                .map((post) => (
                                    <div
                                        key={post._id}
                                        className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-all hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="h-48 w-full rounded-lg object-cover brightness-75"
                                            />
                                            <span className="absolute top-2 right-2 bg-green-500 text-black text-xs px-3 py-1 rounded-full">
                                                Opinion
                                            </span>
                                        </div>
                                        <h2 className="text-green-400 font-semibold text-xl mt-4 hover:text-green-300 cursor-pointer">
                                            <a href={`/posts/${post._id}`}>{post.title}</a>
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {post.description || "प्रविधिसँग सम्बन्धित समाचारको संक्षिप्त विवरण"}
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
                        <p className="text-center text-gray-500 text-lg mt-10">हाल रायसँग सम्बन्धित कुनै समाचार उपलब्ध छैन।</p>
                    )}
                </section>

                {/* Advertisement Section */}
                <div className="bg-stone-200 py-5 w-2/3 mx-auto my-10 flex items-center justify-center">
                    <Advertisement />
                </div>


            </main >
            )}
        </>
>>>>>>> 3cf05e8 (loading add in page)
    )
};
export default Home;
