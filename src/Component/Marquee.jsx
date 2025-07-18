import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
const brandLogos = [
  { name: "Under Armour", src: "https://cdn.simpleicons.org/underarmour/00ff00" },
  { name: "Reebok", src: "https://cdn.simpleicons.org/reebok/00ff00" },
  { name: "Puma", src: "https://cdn.simpleicons.org/puma/00ff00" },
  { name: "Nike", src: "https://cdn.simpleicons.org/nike/00ff00" },
  { name: "The North Face", src: "https://cdn.simpleicons.org/thenorthface/00ff00" },
  { name: "Adidas", src: "https://cdn.simpleicons.org/adidas/00ff00" },
  { name: "Fila", src: "https://cdn.simpleicons.org/fila/00ff00" },
  { name: "New Balance", src: "https://cdn.simpleicons.org/newbalance/00ff00" },
];

const BrandMarquee = () => {
  return (
    <div className="py-6 max-w-10/12 mx-auto">
         <motion.h2
        className="text-3xl md:text-5xl dancing-font font-extrabold text-center text-lime-400 drop-shadow-lg mb-16 tracking-wide"
        initial="initial"
        animate="animate"
      >
       Brands <span className="text-gray-500">That Support Us</span>
      </motion.h2>
      <Marquee gradient={false} speed={50}>
        {brandLogos.map((brand, index) => (
          <div
            key={index}
            className="mx-10 flex items-center justify-center"
            style={{ width: 96, height: 96 }}
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
