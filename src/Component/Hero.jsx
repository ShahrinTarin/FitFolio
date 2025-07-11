import React from "react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-84px)] bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('https://i.ibb.co/zWqkQDpy/john.png')`,
      }}
    >
      {/* Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-xs bg-black/30"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
          Sculpt <span className="text-lime-400">Your</span> Body,
          <br className="hidden sm:block" /> Elevate <span className="text-lime-400">Your</span> Spirit
        </h1>

        <p className="text-lg sm:text-sm md:text-lg text-gray-200 mb-8 max-w-2xl">
          Join our community of fitness enthusiasts and unlock your true potential.
          We help you stay motivated, healthy, and inspired every day.
        </p>

        <button className="bg-lime-400 cursor-pointer text-black font-semibold py-3 px-8 rounded-full hover:bg-lime-500 transition">
          Let&apos;s Start &gt;&gt;&gt;
        </button>
      </div>
    </section>
  );
};

export default Hero;
