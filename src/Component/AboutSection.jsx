import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobeAmericas,
  FaLightbulb,
  FaUsers,
  FaHeartbeat,
} from "react-icons/fa";

const features = [
  {
    icon: FaGlobeAmericas,
    title: "Global Community",
    description:
      "Join a vibrant and diverse network of fitness enthusiasts from every corner of the world. Share your journey, celebrate milestones, and motivate each other to push beyond limits while connecting over shared goals and inspiring stories.",
  },
  {
    icon: FaLightbulb,
    title: "Innovative Technology",
    description:
      "Harness the power of the latest fitness tech, from AI-driven personalized workout plans to seamless integration with your favorite devices. Our platform evolves with you, providing smart insights and tailored recommendations to make your fitness journey efficient and enjoyable.",
  },
  {
    icon: FaUsers,
    title: "Member-Centered Design",
    description:
      "Built with real users in mind, every feature and interaction is crafted to empower you. Whether you're a beginner or a seasoned athlete, our intuitive and accessible design ensures that your fitness goals are achievable and your experience is smooth and supportive.",
  },
  {
    icon: FaHeartbeat,
    title: "Health First",
    description:
      "Prioritize your holistic wellness with features that nurture both physical and mental health. From heart rate monitoring to mindfulness tools, FitFolio supports you in building a balanced lifestyle that strengthens your body and calms your mind.",
  },
];

const AboutSection = () => {
  return (
    <section
      className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-[95vw] mx-auto rounded-3xl shadow-xl backdrop-blur-md overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/LztY3Sgc/flux-1-kontext-pro-makea-photo-like-th.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/70 rounded-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-6xl text-center text-lime-400 font-extrabold mb-6 dancing-font drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          About FitFolio
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          className="text-center text-gray-600 max-w-3xl mx-auto text-xs sm:text-sm mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          FitFolio is a forward-thinking platform reshaping how people experience fitness. We combine advanced
          technology with expert guidance to empower individuals on their health journey—no matter where they start.
          Our mission is to build a supportive and inclusive space where users can grow stronger, together.
        </motion.p>

        {/* Vertical Timeline */}
        <div className="relative border-l-4 border-lime-400 pl-10 space-y-14 max-w-4xl mx-auto">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              className="relative flex items-start gap-5"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              {/* Icon bubble */}
              <div className="absolute -left-12 top-1.5 bg-zinc-900 p-3 rounded-full border-2 border-lime-400 shadow-lg">
                <Icon className="w-6 h-6 text-lime-400" />
              </div>

              {/* Content */}
              <div className="ml-6">
                <h3 className="text-xl lobster font-semibold text-lime-300 mb-3">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
