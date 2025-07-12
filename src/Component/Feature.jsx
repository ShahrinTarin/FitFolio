import React, { useEffect } from "react";
import {
  FaDumbbell,
  FaUsers,
  FaChartLine,
  FaHeartbeat,
  FaRunning,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const features = [
  {
    title: "Personalized Workouts",
    description: "Tailor your fitness plan to your goals with our smart algorithms.",
    icon: FaDumbbell,
  },
  {
    title: "Community Support",
    description: "Join a vibrant community of fitness enthusiasts for motivation and tips.",
    icon: FaUsers,
  },
  {
    title: "Progress Tracking",
    description: "Visualize your improvement with detailed analytics and charts.",
    icon: FaChartLine,
  },
  {
    title: "Health Monitoring",
    description: "Keep track of your heart rate, sleep, and overall wellness.",
    icon: FaHeartbeat,
  },
  {
    title: "Activity Logging",
    description: "Easily log your runs, workouts, and daily activities.",
    icon: FaRunning,
  },
];

// Container variant to stagger children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, // delay between children animation
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.25, duration: 0.7 },
  },
  hover: {
    scale: 1.05,
    boxShadow:
      "0 12px 24px rgba(40, 230, 120, 0.3), 0 8px 16px rgba(40, 230, 120, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const iconVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

const headingVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const Feature = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section className="py-20 my-24 bg-white/5 border-white/10 rounded-3xl max-w-[95vw] mx-auto px-4 lg:px-8 bg-gradient-to-tr from-black/30 via-black/20 to-black/40 backdrop-blur-lg border ">
      <motion.h2
        className="text-4xl md:text-6xl dancing-font font-extrabold text-center text-lime-400 drop-shadow-lg mb-16 tracking-wide"
        variants={headingVariants}
        initial="initial"
        animate="animate"
      >
        Why Choose FitFolio?
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        viewport={{ once: false }}
      >
        {features.map(({ title, description, icon: Icon }) => (
          <motion.div
            key={title}
            className="bg-zinc-900 bg-opacity-80 text-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            viewport={{ once: false }}
          >
            <motion.div
              className="mb-6 text-lime-400 drop-shadow-md"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              viewport={{ once: false }}
            >
              <Icon className="w-16 h-16" />
            </motion.div>
            <h3 className="text-2xl font-semibold mb-3 text-lime-300 tracking-wide">
              {title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Feature;
