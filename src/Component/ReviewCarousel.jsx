import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
    FaQuoteLeft,
    FaStar,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import Loader from "@/Shared/Loader";

const ReviewCarousel = () => {
    const axiosSecure = useAxiosSecure();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const { data: reviews = [], isLoading, error } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return Array.isArray(res.data) ? res.data : [];
        },
    });

    if (isLoading) return <Loader />;
    if (error)
        return (
            <p className="text-red-400 text-center">Failed to load reviews</p>
        );
    if (!reviews.length)
        return <p className="text-gray-400 text-center">No reviews yet</p>;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pb-12">
            {/* New heading + paragraph */}
            <h2 className="text-4xl md:text-6xl text-center text-gray-900 font-extrabold mb-6 dancing-font">
                <span className="block text-white">Your Success</span>
                <span className="block text-lime-400">Stories, Our Inspiration</span>
            </h2>
            <p className="text-center text-sm sm:text-base text-gray-400 mb-10  mx-auto">
                See how our customers have achieved their goals and let their journeys inspire yours!
            </p>

            {/* Swiper Carousel */}
            <div className="relative">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={3}
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onSwiper={(swiper) => {
                        // Bind navigation after swiper instance is ready
                        setTimeout(() => {
                            if (
                                swiper.params.navigation &&
                                prevRef.current &&
                                nextRef.current
                            ) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review._id}>
                            <div className="bg-gradient-to-br from-gray-950 to-black border border-lime-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-lime-500/30 transition duration-300 relative flex flex-col h-full">
                                <FaQuoteLeft className="absolute text-[100px] text-lime-900 opacity-10 top-4 right-4 z-0" />

                                <div className="flex gap-1 text-yellow-400 z-10">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <p className="text-sm text-gray-300 italic mt-2 z-10">
                                    {review.feedback.length > 180
                                        ? `${review.feedback.slice(0, 180)}...`
                                        : review.feedback}
                                </p>

                                <div className="border-t border-gray-700 mt-4 pt-4 z-10" />

                                <div className="flex items-center gap-4 mt-auto z-10">
                                    <img
                                        src={review.userphoto || "/default-user.png"}
                                        alt={review.userName}
                                        className="w-12 h-12 rounded-full object-cover border border-lime-400"
                                    />
                                    <div>
                                        <p className="font-semibold text-lime-300 text-sm">
                                            {review.userName || "Anonymous"}
                                        </p>
                                        <p className="text-xs text-gray-500">{review.userEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Arrows */}
                <div className="mt-8 flex justify-center items-center gap-6">
                    <button
                        ref={prevRef}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-lime-500 text-black hover:bg-lime-600 transition shadow-md"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        ref={nextRef}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-lime-500 text-black hover:bg-lime-600 transition shadow-md"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewCarousel;
