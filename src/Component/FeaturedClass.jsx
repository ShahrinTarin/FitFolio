import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import Loader from '@/Shared/Loader';

const FeaturedClass = () => {
  const { data: featuredClasses = [], isLoading, error } = useQuery({
    queryKey: ['featuredClasses'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/classes/featured');
      return res.data;
    },
  });

  if (isLoading)
    return <Loader></Loader>
  if (error)
    return (
      <div className="text-center text-red-500 py-10 text-lg">
        Failed to load featured classes.
      </div>
    );

  return (
    <section className="relative z-10 max-w-11/12 mx-auto px-4 py-20 mb-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black opacity-60 -z-10 rounded-3xl"></div>

      <h2 className="text-4xl md:text-6xl font-extrabold text-center text-lime-400 mb-16 drop-shadow-md dancing-font">
        Featured Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {featuredClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-[#0f0f0f] text-white rounded-3xl p-6 border border-lime-500/20 shadow-[0_0_20px_#84cc16] hover:shadow-[0_0_40px_#84cc16] hover:scale-[1.03] transition duration-300 ease-in-out"
          >
            {/* Optional Image */}
            {cls.image && (
              <img
                src={cls.image}
                alt={cls.name}
                className="w-full h-40 object-cover rounded-xl mb-4 border border-lime-500/10"
              />
            )}

            {/* Icon */}
            <div className="text-3xl text-lime-400 mb-3">
              <FaUsers />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-lime-400 mb-2">
              {cls.name}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4">
              {cls.details?.slice(0, 100)}...
            </p>

            {/* Badge */}
            <div className="bg-lime-600 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block shadow-md">
              Total Bookings: {cls.bookingCount || 0}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClass;
