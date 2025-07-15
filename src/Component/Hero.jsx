import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bgImages = [
  "https://i.ibb.co/zWqkQDpy/john.png",
  "https://i.ibb.co/RpwX2bxf/bannner2.jpg",
  "https://i.ibb.co/wnKVvW3/360-F-70729688-e6-Lm-Cq-Depn-N0-W4t5bw-Fur48-Pc-Pii-Ei-Tj.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    isInView ? controls.start("visible") : controls.start("hidden");
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentImage(index);
  const goNext = () => setCurrentImage((prev) => (prev + 1) % bgImages.length);
  const goPrev = () => setCurrentImage((prev) => (prev - 1 + bgImages.length) % bgImages.length);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6 } },
  };

  return (
    <section className="relative rounded-3xl border border-white/10 w-full h-[90vh] overflow-hidden shadow-xl">
      {/* Background Image */}
      <motion.div
        key={currentImage}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url('${bgImages[currentImage]}')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Blur Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Arrows */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 left-6 -translate-y-1/2 z-20 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 p-3 rounded-full shadow-lg border border-white/10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goNext}
        className="absolute top-1/2 right-6 -translate-y-1/2 z-20 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 p-3 rounded-full shadow-lg border border-white/10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Hero Content */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          Sculpt <span className="text-lime-400">Your</span> Body,
          <br className="hidden sm:block" />
          Elevate <span className="text-lime-400">Your</span> Spirit
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-200 mb-10 max-w-2xl"
          variants={paragraphVariants}
          initial="hidden"
          animate={controls}
        >
          Join our community of fitness enthusiasts and unlock your true potential.
          We help you stay motivated, healthy, and inspired every day.
        </motion.p>

        <motion.button
          className="bg-lime-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-lime-500 transition shadow-md"
          variants={buttonVariants}
          initial="hidden"
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let&apos;s Start &gt;&gt;&gt;
        </motion.button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bgImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentImage
                ? "bg-lime-400 shadow-md scale-110"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
