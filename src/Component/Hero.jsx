import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
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
         viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Sculpt <span className="text-lime-400">Your</span> Body,
          <br className="hidden sm:block" /> Elevate{" "}
          <span className="text-lime-400">Your</span> Spirit
        </motion.h1>

        <motion.p
          className="text-lg sm:text-sm md:text-lg text-gray-200 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Join our community of fitness enthusiasts and unlock your true potential.
          We help you stay motivated, healthy, and inspired every day.
        </motion.p>

        <motion.button
          className="bg-lime-400 cursor-pointer text-black font-semibold py-3 px-8 rounded-full hover:bg-lime-500 transition"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
           viewport={{ once: false, amount: 0.5 }}
        >
          Let&apos;s Start &gt;&gt;&gt;
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
