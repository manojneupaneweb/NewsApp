
function NepalExchangeRates() {
    return (
        <>
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

        </>
    )
}

export default NepalExchangeRates