import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import Loader from '@/Shared/Loader';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const FeaturedClass = () => {
  const { data: featuredClasses = [], isLoading, error } = useQuery({
    queryKey: ['featuredClasses'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/classes/featured');
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10 text-lg">
        Failed to load featured classes.
      </div>
    );

  return (
    <section className="relative z-10 max-w-11/12 mx-auto px-4 py-20 mb-10">
      <div className="absolute inset-0 bg-transparent opacity-60 -z-10 rounded-3xl"></div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: false }}
        className="text-4xl md:text-6xl font-extrabold text-center text-lime-400 mb-16 drop-shadow-md dancing-font"
      >
        Featured Classes
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {featuredClasses.map((cls, index) => (
          <motion.div
            key={cls._id}
            className="bg-[#0f0f0f] text-white rounded-3xl p-6 border border-lime-500/20 shadow-[0_0_15px_#84cc16] hover:shadow-[0_0_40px_#84cc16] hover:scale-[1.03] transition duration-300 ease-in-out"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            custom={index}
          >
            {cls.image && (
              <motion.img
                src={cls.image}
                alt={cls.name}
                className="w-full h-40 object-cover rounded-xl mb-4 border border-lime-500/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: false }}
              />
            )}

            <div className="text-3xl text-lime-400 mb-3">
              <FaUsers />
            </div>

            <h3 className="text-2xl font-bold text-lime-400 mb-2">
              {cls.name}
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              {cls.details?.slice(0, 100)}...
            </p>

            <div className="bg-lime-600 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block shadow-md">
              Total Bookings: {cls.bookingCount || 0}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClass;
