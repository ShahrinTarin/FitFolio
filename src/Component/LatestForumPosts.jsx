import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router'; 
import Loader from '@/Shared/Loader';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, type: 'spring' },
  }),
};

const LatestForumPosts = () => {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['forums', 'latest'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/forums/latest');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10 text-lg">
        Failed to load latest posts.
      </div>
    );

  return (
    <section className="relative z-10 max-w-11/12 mx-auto px-4 pb-20 mt-16 text-white">
      <div className="absolute inset-0 bg-transparent opacity-60 -z-10 rounded-3xl"></div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: false }}
        className="text-4xl md:text-6xl font-extrabold text-center text-lime-400 mb-16 drop-shadow-md dancing-font"
      >
        Latest Forum Posts
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariant}
            className="bg-[#0f0f0f] rounded-3xl p-6 border border-lime-500/20 shadow-[0_0_14px_#84cc16] hover:shadow-[0_0_40px_#84cc16] hover:scale-[1.03] transition duration-300 ease-in-out overflow-hidden flex flex-col min-h-[360px] justify-between"
          >
            {post.image && (
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-44 object-cover rounded-xl mb-4 border border-lime-500/10"
                whileHover={{ scale: 1.02 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3 }}
              />
            )}

            <h3 className="text-xl font-bold text-lime-400 mb-2 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-400 mb-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-300 mb-4 line-clamp-4">
              {post.description.length > 100
                ? `${post.description.slice(0, 100)}...`
                : post.description}
            </p>

            {/* Bottom row: category left, read more right */}
            <div className="mt-auto flex items-center justify-between">
              <span className="inline-block bg-lime-600/20 text-lime-400 px-3 py-1 text-xs font-medium rounded-full max-w-max">
                {post.category}
              </span>

              <Link
                to={`/forums/${post._id}`}
                className="inline-flex items-center gap-1 text-lime-400 font-semibold hover:underline"
              >
                Read More <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: false }}
        className="mt-12 text-center"
      >
        <Link
          to="/forums"
          className="inline-flex items-center gap-2 bg-lime-500 text-black px-6 py-2 rounded-full font-bold shadow hover:scale-105 hover:bg-lime-400 transition-transform duration-300"
        >
          See All Posts <FaArrowRight />
        </Link>
      </motion.div>
    </section>
  );
};

export default LatestForumPosts;
