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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.6,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(132, 204, 22, 0.25)",
    transition: { duration: 0.3 },
  },
};

const iconHoverVariants = {
  hover: {
    rotate: [0, 10, -10, 10, -10, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const headingVariants = {
  initial: { opacity: 0, y: -30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const Feature = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section className="py-20 my-24 bg-white/5 border-white/10 rounded-3xl max-w-[95vw] mx-auto px-4 lg:px-8 bg-gradient-to-tr from-black/30 via-black/20 to-black/40 backdrop-blur-lg border">
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
            initial="hidden"
            animate="visible"
            viewport={{ once: false }}
          >
            <motion.div
              className="mb-6 text-lime-400 drop-shadow-md"
              variants={iconHoverVariants}
              whileHover="hover"
            >
              <Icon className="w-14 h-14" />
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
