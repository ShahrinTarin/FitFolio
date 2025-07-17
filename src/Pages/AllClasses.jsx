import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loader from '@/Shared/Loader';

const LIMIT = 6;

const AllClasses = () => {
  const [page, setPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  const { data: classData = {}, isLoading } = useQuery({
    queryKey: ['all-classes', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class?page=${page}&limit=${LIMIT}`);
      return res.data;
    },
  });

  const { classes = [], total = 0 } = classData;
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen bg-black text-lime-400 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Classes</h2>

      {isLoading ? (
        <Loader></Loader>
      ) : classes.length === 0 ? (
        <p className="text-center text-white">No classes available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <ClassCard key={cls._id} cls={cls} />
          ))}
        </div>
      )}

      {/* Pagination with Arrows */}
      <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`px-3 py-1 rounded transition ${
              page === n + 1
                ? 'bg-lime-400 text-black font-semibold'
                : 'bg-gray-800 text-white'
            }`}
          >
            {n + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

const ClassCard = ({ cls }) => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ['trainers-by-class', cls.name],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers-by-class/${cls.name}`);
      return res.data;
    },
  });

  return (
    <div className="bg-gray-900 rounded-xl p-4 shadow-md border border-lime-400">
      <img
        src={cls.image}
        alt={cls.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-xl font-semibold">{cls.name}</h3>
      <p className="text-sm text-gray-300">{cls.details}</p>
      <p className="text-xs text-gray-400 mt-1">{cls.extraInfo}</p>
      <p className="text-xs mt-1">Total Bookings: {cls.bookingCount}</p>

      <div className="mt-4">
        <h4 className="text-sm text-lime-300 mb-1">Trainers:</h4>
        <div className="flex space-x-2">
          {isLoading ? (
            <p className="text-xs text-gray-400">Loading...</p>
          ) : trainers.length > 0 ? (
            trainers.map((trainer) => (
              <Link to={`/trainerdetails/${trainer._id}`} key={trainer._id}>
                <img
                  src={trainer.profileImage}
                  alt={trainer.trainerName}
                  className="w-10 h-10 rounded-full border border-lime-400 hover:scale-110 transition"
                  title={trainer.trainerName}
                />
              </Link>
            ))
          ) : (
            <p className="text-xs text-gray-400">No trainers yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
