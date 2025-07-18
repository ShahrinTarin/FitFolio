import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/Shared/Loader';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const ForumDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['forum', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500 text-center">Failed to load forum post.</p>;

  const { title, image, category, description, createdAt, votes, voters } = post;

  return (
    <div className="relative min-h-screen pt-12 px-4 md:px-8 text-white overflow-hidden">

      {/* 📦 Glass-like Card */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white/5 backdrop-blur-lg border border-lime-500/20 shadow-[0_0_40px_#84cc1625] rounded-2xl p-6 md:p-10">

        {/* 🧩 Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-lime-400 mb-8 drop-shadow-md dancing-font">
          Forum Details
        </h2>

        {/* 🖼 Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover rounded-xl mb-6 border border-white/10"
        />

        {/* ✏️ Meta */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-white">{title}</h1>
          <p className="text-sm text-gray-300">
            Category: <span className="text-lime-400 font-medium">{category}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Posted on: {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        {/* 📄 Description */}
        <p className="text-base md:text-lg leading-relaxed text-gray-200 mb-10 whitespace-pre-wrap">
          {description}
        </p>

        {/* 👍 Voting */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-green-400">
            <FaThumbsUp />
            <span>{votes?.up || 0}</span>
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <FaThumbsDown />
            <span>{votes?.down || 0}</span>
          </div>
        </div>

        {/* 👤 Voter Info */}
        {voters?.authorEmail && (
          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-lime-300 mb-1">Voter Info</h3>
            <p className="text-sm text-gray-300">Author Email: {voters.authorEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumDetails;
