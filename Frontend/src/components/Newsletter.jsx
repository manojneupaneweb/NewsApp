const Newsletter = () => {
    return (
        <section className="py-10 px-5 md:px-20 bg-blue-500 text-white text-center rounded-sm shadow-lg">
            <h2 className="text-3xl font-bold mb-4">🔔 हाम्रो न्यूजलेटरमा सदस्यता लिनुहोस्</h2>
            <p className="text-gray-300 mb-6">हाम्रो पछिल्लो व्यापार, प्रविधि, र अन्य खबरहरू तुरुन्तै प्राप्त गर्नुहोस्।</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                    type="email"
                    placeholder="तपाईंको ईमेल प्रविष्ट गर्नुहोस्"
                    className="w-full md:w-1/3 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-red-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold">
                    सदस्यता लिनुहोस्
                </button>
            </div>
        </section>
    );
};

export default Newsletter;
