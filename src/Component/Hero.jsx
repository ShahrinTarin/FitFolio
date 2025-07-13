import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

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
    <section
      className="relative w-full min-h-[calc(100vh-84px)] bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('https://i.ibb.co/zWqkQDpy/john.png')`,
      }}
    >
      {/* Blur Layer */}
      <motion.div
        className="absolute inset-0 backdrop-blur-xs bg-black/30"
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Content */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          Sculpt <span className="text-lime-400">Your</span> Body,
          <br className="hidden sm:block" /> Elevate{" "}
          <span className="text-lime-400">Your</span> Spirit
        </motion.h1>

        <motion.p
          className="text-lg sm:text-sm md:text-lg text-gray-200 mb-8 max-w-2xl"
          variants={paragraphVariants}
          initial="hidden"
          animate={controls}
        >
          Join our community of fitness enthusiasts and unlock your true
          potential. We help you stay motivated, healthy, and inspired every
          day.
        </motion.p>

        <motion.button
          className="bg-lime-400 cursor-pointer text-black font-semibold py-3 px-8 rounded-full hover:bg-lime-500 transition"
          variants={buttonVariants}
          initial="hidden"
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let&apos;s Start &gt;&gt;&gt;
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
