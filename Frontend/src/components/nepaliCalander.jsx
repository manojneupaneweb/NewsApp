
function NepaliCalander() {
    return (
        <>
            <section className="py-10 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center ">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                            नेपाली पात्रो
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Traditional Nepali calendar with festivals, holidays, and cultural events
                        </p>
                    </div>

                    {/* Calendar Container */}
                    <div className=" rounded-2xl shadow-xl sm:p-8 relative overflow-hidden border border-gray-100">
                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-00 rounded-full opacity-10"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-red-500 rounded-full opacity-10"></div>

                        <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 bg-white">
                            <iframe
                                src="https://www.ashesh.com.np/calendarlink/calendar.php"
                                className="w-full h-[320px] sm:h-[330px] transition-all duration-300 hover:shadow-lg "
                                title="Nepali Calendar"
                                loading="lazy"
                            />

                            {/* Overlay for click protection */}
                            <div className="absolute inset-0 z-10 cursor-pointer"
                                title="Nepali Calendar Widget"></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-2">
                        <p className="text-sm text-gray-600 mb-3 sm:mb-0">
                            ©{" "}
                            <span className="text-gray-800 font-semibold">
                                Nepali Calendar
                            </span>
                            {" "} - Preserving Nepali culture and traditions
                        </p>

                    </div>
                </div>
            </section>
        </>
    )
}

export default NepaliCalander