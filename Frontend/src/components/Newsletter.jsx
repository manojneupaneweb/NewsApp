const Newsletter = () => {
    return (
        <section className="py-16 px-5 md:px-20 bg-white border border-gray-200 rounded-xl shadow-xl text-center my-8">
            <div className="max-w-3xl mx-auto">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Never Miss an Update
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
                    Join thousands of readers who get exclusive insights on business trends, 
                    technology breakthroughs, and market news every week.
                </p>
                
                {/* Subscription Form */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        required
                    />
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;