import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo JPEG.jpg";
import moment from "moment";
import Advertisement from '../../components/advertisement';
import { fetchAllPosts } from '../../utils/Post.Fatching';
import Newsletter from '../../components/Newsletter.jsx';
import Loading from '../../components/Loading.jsx';
import PropTypes from 'prop-types';
import NepaliCalander from '../../components/nepaliCalander.jsx';
import NepalExchangeRates from '../../components/NepalExchangeRates.jsx';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

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
        localStorage.setItem('disclaimerSeen', 'true');
    };

    // Category filtering
    const categories = [
        { id: 'all', name: 'सबै समाचार', icon: 'fa-newspaper', color: 'blue' },
        { id: 'health', name: 'स्वास्थ्य', icon: 'fa-heart-pulse', color: 'green' },
        { id: 'business', name: 'व्यापार', icon: 'fa-chart-line', color: 'purple' },
        { id: 'sports', name: 'खेलकुद', icon: 'fa-trophy', color: 'red' },
        { id: 'technology', name: 'प्रविधि', icon: 'fa-microchip', color: 'indigo' },
        { id: 'finance', name: 'वित्त', icon: 'fa-money-bill-wave', color: 'emerald' }
    ];

    const filteredPosts = activeCategory === 'all'
        ? posts
        : posts.filter(post => post.category?.toLowerCase() === activeCategory);

    const BreakingNews = () => (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4">
            <div className="max-w-7xl mx-auto flex items-center">
                <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold mr-4 flex items-center gap-2">
                    <i className="fa-solid fa-bolt"></i> ब्रेकिङ न्यूज
                </span>
                <div className="overflow-hidden flex-1">
                    <div className="animate-marquee whitespace-nowrap font-bold">
                        नेपालमा पछिल्लो समय भ्रष्टाचारविरुद्धको आन्दोलनले ठूलो चर्चा पाएको छ। जेन-जेड पुस्ताले सरकारको विरोध गर्दै व्यापक प्रदर्शन गरेका छन्, जसका कारण प्रधानमन्त्री केपी शर्मा ओलीले राजीनामा दिएका छन्। यस आन्दोलनको परिणामस्वरूप, सुशिला कार्कीलाई अस्थायी प्रधानमन्त्रीको रूपमा नियुक्त गरिएको छ। साथै, नेपाल र वेस्ट इन्डिज बीचको ऐतिहासिक टी-२० क्रिकेट सिरिजको पहिलो खेल आज हुँदैछ। यसका साथै, काठमाडौंको बिजेश्वरीस्थित एक फर्निचर उद्योगमा आगलागी भएको छ, जसमा ठूलो धनमालको क्षति भएको छ। यी घटनाहरूले नेपाली समाजमा ठूलो प्रभाव पारेका छन्।
                    </div>
                </div>
            </div>
        </div>
    );

    const CategoryTabs = () => (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-1 overflow-x-auto py-3 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === category.id
                                ? `bg-${category.color}-100 text-${category.color}-700 border border-${category.color}-300`
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <i className={`fa-solid ${category.icon} text-${category.color}-500`}></i>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
    const NewsCard = ({ post, size = 'medium', showCategory = false }) => (
        <Link
            to={`/post/${post._id}`}
            className="block group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
        >
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl ${size === 'large' ? 'h-96' : size === 'small' ? 'h-48' : 'h-64'
                }`}>
                <div className="relative h-2/3 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {showCategory && post.category && (
                        <span className="absolute top-3 left-3 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                            {post.category}
                        </span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                        <h3 className={`text-white font-bold line-clamp-2 ${size === 'large' ? 'text-xl' : size === 'small' ? 'text-sm' : 'text-base'
                            }`}>
                            {post.title}
                        </h3>
                    </div>
                </div>
                <div className="p-3">
                    <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                        {post.content?.split(" ").slice(0, 20).join(" ")}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <i className="far fa-clock"></i>
                            {moment(post.createdAt).fromNow()}
                        </span>
                        <span className="flex items-center gap-1">
                            <i className="far fa-eye"></i>
                            १.२k
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );

    NewsCard.propTypes = {
        post: PropTypes.object.isRequired,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        showCategory: PropTypes.bool
    };

    const FeaturedSection = () => (
        <section className="py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Featured News */}
                    {posts.slice(0, 1).map((post) => (
                        <Link key={post._id} to={`/post/${post._id}`} className="lg:col-span-2 group cursor-pointer">
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                                        मुख्य समाचार
                                    </span>
                                    <h1 className="text-3xl font-bold text-white leading-tight mb-2 line-clamp-2">
                                        {post.title}
                                    </h1>
                                    <p className="text-gray-200 text-sm line-clamp-2">
                                        {post.content?.split(" ").slice(0, 30).join(" ")}...
                                    </p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={logo}
                                                alt="Author"
                                                className="w-8 h-8 rounded-full border-2 border-white"
                                            />
                                            <span className="text-white text-sm">समाचार टिम</span>
                                        </div>
                                        <span className="text-gray-300 text-sm">
                                            <i className="far fa-clock mr-1"></i>
                                            {moment(post.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Side Featured News */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <i className="fa-solid fa-fire text-red-500"></i>
                            ताजा समाचार
                        </h2>
                        {posts.slice(1, 4).map((post) => (
                            <Link key={post._id} to={`/post/${post._id}`} className="block group cursor-pointer">
                                <div className="flex gap-3 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-1">
                                            <i className="far fa-clock mr-1"></i>
                                            {moment(post.createdAt).fromNow()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100'>
                <Loading />
            </div>
        );
    }

    return (
        <>
            {/* Disclaimer Modal */}
            {visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
                    <div className="bg-gradient-to-br from-white via-blue-50 to-gray-100 rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-scale-in">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fa-solid fa-triangle-exclamation text-red-600 text-2xl"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-red-600 mb-3">📢 महत्वपूर्ण सूचना</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                यो समाचार कुनै आधिकारिक स्रोतबाट प्रमाणित भएको होइन।
                                शैक्षिक उद्देश्यका लागि मात्र सिर्जना गरिएको हो।
                                कुनै कानुनी समस्याको लागि हामी जिम्मेवार हुने छैनौं।
                            </p>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <p className="text-yellow-800 text-sm">
                                    सम्पर्क: {' '}
                                    <a href="https://manoj-neupane.com.np"
                                        className="font-semibold hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Manoj Neupane
                                    </a>
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                बुझेँ, आगा बढाउनुहोस्
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="bg-gray-50 min-h-screen">
                {/* Breaking News */}
                <BreakingNews />

                {/* Category Tabs */}
                <CategoryTabs />

                {/* Featured Section */}
                <FeaturedSection />

                {/* Nepal Exchange Rates */}
                <section className="py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <section className="py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <div className="relative w-full overflow-hidden rounded-lg">
                                <iframe
                                    src="https://www.ashesh.com.np/forex/widget2.php?api=7800x8p484&header_color=38b45e&background_color=faf8ee&header_title=Nepal%20Exchange%20Rates"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginWidth="0"
                                    marginHeight="0"
                                    className="w-full h-[383px] rounded-lg"
                                    title="Nepal Exchange Rates"
                                ></iframe>

                                {/* Disable all links and clicks */}
                                <div className="absolute inset-0 z-10 cursor-text"></div>
                            </div>

                            <p className="text-sm text-gray-600 mt-2 text-left">
                                ©{" "}
                                <span className="text-gray-700">
                                    Nepal Exchange Rates
                                </span>
                            </p>
                        </section>
                    </div>
                </section>

                {/* Advertisement */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Advertisement />
                </div>

                {/* Main News Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <i className="fa-solid fa-newspaper text-blue-600"></i>
                            {activeCategory === 'all' ? 'सबै समाचार' :
                                categories.find(cat => cat.id === activeCategory)?.name}
                        </h2>
                        <span className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full">
                            {filteredPosts.length} समाचार
                        </span>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <i className="fa-solid fa-newspaper text-6xl text-gray-300 mb-4"></i>
                            <p className="text-gray-500 text-lg">हाल कुनै समाचार उपलब्ध छैन</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPosts.slice(0, 12).map((post, index) => (
                                <NewsCard
                                    key={post._id}
                                    post={post}
                                    size={index === 0 ? 'large' : 'medium'}
                                    showCategory={true}
                                />
                            ))}
                        </div>
                    )}
                </section>


                {/* Nepal Exchange Rates */}
                <NepalExchangeRates />

                {/* Category Sections */}
                {categories.slice(1).map((category) => {
                    const categoryPosts = posts.filter(post =>
                        post.category?.toLowerCase() === category.id
                    ).slice(0, 4);

                    if (categoryPosts.length === 0) return null;

                    return (
                        <section key={category.id} className={`py-12 ${category.id === 'technology' ? 'bg-gray-900' : 'bg-white'
                            }`}>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className={`text-3xl font-bold flex items-center gap-3 ${category.id === 'technology' ? 'text-white' : `text-${category.color}-700`
                                        }`}>
                                        <i className={`fa-solid ${category.icon}`}></i>
                                        {category.name}
                                    </h2>
                                    <Link
                                        to={`/${category.id}`}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${category.id === 'technology'
                                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                                            : `bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200`
                                            }`}
                                    >
                                        सबै हेर्नुहोस्
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {categoryPosts.map((post, index) => (
                                        <NewsCard
                                            key={post._id}
                                            post={post}
                                            size={index === 0 ? 'large' : 'small'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}


                {/* Nepali Calendar Widget */}
                <NepaliCalander />

                {/* Final Advertisement */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Advertisement />
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Newsletter />
                    </div>
                </div>
            </main>

            <style>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                @keyframes scale-in {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}

export default Home;