import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TrainerCard from '@/Component/TrainerCard';
import Loader from '@/Shared/Loader';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const TrainerSection = () => {
  const navigate = useNavigate();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['approvedTrainers'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/trainers/approved');
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-center text-red-500">Failed to load trainers.</div>;
  if (trainers.length === 0)
    return <div className="text-center text-gray-500 py-10">No approved trainers found.</div>;

  return (
    <section className="md:w-11/12 w-full mt-8 mb-16 mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-6 dancing-font drop-shadow-lg"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        All Trainers
      </motion.h2>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {trainers.map((trainer) => (
          <motion.div key={trainer._id} variants={cardVariants}>
            <TrainerCard
              trainer={trainer}
              onKnowMore={() => navigate(`/trainerdetails/${trainer._id}`)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrainerSection;
