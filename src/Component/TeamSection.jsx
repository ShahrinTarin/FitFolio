import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const TeamSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ['featured-trainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/trainers/featured');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10 text-white">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 pb-24">
      {/* Heading */}
      <div className="text-center mb-20 ">
        <h2 className="dancing-font text-4xl md:text-6xl font-extrabold leading-tight text-white mb-4">
          Your Fitness <br />
          <span className="text-lime-400">Goals, Their Expertise</span>
        </h2>
        <p className="mt-4 text-gray-400 text-sm sm:text-base  mx-auto">
          Our elite team of certified trainers is here to guide your journey with skill, experience, and inspiration.
        </p>
      </div>

      {/* Trainers Grid */}
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="group relative bg-[#0c0c0c] border border-lime-500/30 hover:border-lime-400 rounded-3xl p-8 pt-12 shadow-lg hover:shadow-lime-500/20 transition-all duration-500"
          >
            {/* Decorative Glow Behind Image */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-lime-400/20 blur-2xl z-0"></div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <img
                src={trainer.profileImage}
                alt={trainer.fullName}
                className="w-28 h-28 rounded-full object-cover border-4 border-lime-500 shadow-lg mb-4 transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-2xl font-bold text-white mb-1">{trainer.fullName}</h3>
              <p className="text-sm text-gray-400 italic mb-4 px-2">{trainer.otherInfo}</p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {trainer.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-lime-800/10 text-lime-300 text-xs px-3 py-1 rounded-full border border-lime-500/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-5 text-lime-400 text-xl mt-2">
                {trainer.facebook && (
                  <a
                    href={trainer.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lime-300 transition"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {trainer.linkedin && (
                  <a
                    href={trainer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lime-300 transition"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
