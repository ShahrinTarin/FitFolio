import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
    if (error) return <p className="text-red-400 text-center">Failed to load reviews</p>;
    if (!reviews.length) return <p className="text-gray-400 text-center">No reviews yet</p>;

    return (
        <section
            className="w-full py-20 mb-10 px-4 text-white"
            style={{
                background: `
                    radial-gradient(
                        circle at 0% 50%,
                        rgba(173, 255, 47, 0.08),
                        rgba(0, 0, 0, 0.95) 60%
                    )
                `,
            }}
        >
            {/* Lime dot customization */}
            <style>
                {`
                    .swiper-pagination-bullet {
                        background-color: rgba(132, 204, 22, 0.3);
                        opacity: 1;
                    }
                    .swiper-pagination-bullet-active {
                        background-color: #84cc16;
                    }
                `}
            </style>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                
                {/* LEFT TEXT COLUMN */}
                <div className="md:w-1/2 text-left">
                    <h2 className="text-4xl md:text-5xl dancing-font font-extrabold leading-tight mb-4">
                        Don’t just take our <span className="text-lime-500">word</span> for it
                    </h2>
                    <p className="text-gray-200 mb-6 text-sm sm:text-base">
                        Hear directly from the people who matter most — our members.
                    </p>
                    <a
                        href="/"
                        className="text-lime-300 font-semibold hover:underline text-sm"
                    >
                        SEE ALL REVIEWS
                    </a>
                </div>

                {/* RIGHT REVIEW CAROUSEL */}
                <div className="md:w-1/2 w-full relative">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={1}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        onSwiper={(swiper) => {
                            setTimeout(() => {
                                if (swiper.params.navigation) {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    swiper.navigation.destroy();
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }
                            });
                        }}
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review._id}>
                                <div className="bg-[#111] border border-gray-700 rounded-2xl p-6 shadow-lg relative flex flex-col min-h-[260px] justify-between">
                                    <p className="italic text-sm text-gray-300 z-10">
                                        {review.feedback.length > 280
                                            ? `${review.feedback.slice(0, 280)}...`
                                            : review.feedback}
                                    </p>

                                    <div className="mt-6 flex items-center gap-3 z-10">
                                        <img
                                            src={review.userphoto || "/default-user.png"}
                                            alt={review.userName}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-lime-500"
                                        />
                                        <div>
                                            <p className="font-semibold text-white text-sm">
                                                {review.userName || "Anonymous"}
                                            </p>
                                            <p className="text-xs text-gray-500">{review.userEmail}</p>
                                        </div>
                                    </div>

                                    {/* Star rating */}
                                    <div className="absolute bottom-4 left-6 flex gap-1 text-lime-400 z-10">
                                        {Array.from({ length: review.rating }, (_, i) => (
                                            <FaStar key={i} size={14} />
                                        ))}
                                    </div>

                                    {/* Quote icon */}
                                    <FaQuoteLeft className="absolute top-3 right-4 text-[90px] text-lime-900 opacity-10 z-0" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Arrows */}
                    <button
                        ref={prevRef}
                        className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-[-30px] z-20 text-lime-400 text-xl border border-lime-400 rounded-full w-9 h-9 flex items-center justify-center hover:bg-lime-400 hover:text-black transition"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        ref={nextRef}
                        className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-[-30px] z-20 text-lime-400 text-xl border border-lime-400 rounded-full w-9 h-9 flex items-center justify-center hover:bg-lime-400 hover:text-black transition"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReviewCarousel;
