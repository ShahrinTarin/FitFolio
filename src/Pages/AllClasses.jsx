import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Loader from '@/Shared/Loader';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BiSort, BiSortUp, BiSortDown } from "react-icons/bi";
const LIMIT = 6;

const AllClasses = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  // '' | 'asc' | 'desc'
  const [sort, setSort] = useState(''); 
  const axiosSecure = useAxiosSecure();
  const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | AllClasses';
    setPageTitle(newTitle);
    document.title = newTitle;
  }, []);

  const { data: classData = {}, isLoading } = useQuery({
    queryKey: ['all-classes', page, search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/class?page=${page}&limit=${LIMIT}&search=${encodeURIComponent(
          search
        )}&sort=${sort}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { classes = [], total = 0 } = classData;
  const totalPages = Math.ceil(total / LIMIT);

  // toggle sorting function
  const toggleSort = () => {
    setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-black text-lime-400 p-6">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-6"
      >
        All Classes
      </motion.h2>

      {/* Search + Sort Bar */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            placeholder="Search classes by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            spellCheck={false}
            autoComplete="off"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lime-400 text-xl" />
        </div>

        {/* Sort Button */}
        <button
          onClick={toggleSort}
          className={`flex items-center max-w-lg justify-center gap-2 px-6 py-3 cursor-pointer rounded-full font-semibold transition w-full md:w-auto ${sort === 'asc'
            ? 'bg-lime-400 text-black'
            : sort === 'desc'
              ? 'bg-lime-500 text-black'
              : 'bg-gray-800 text-white hover:bg-lime-600'
            }`}
        >
          {sort === 'asc' ? (
            <>
              <BiSortUp className="text-xl" />
              Sort ↑ (Low → High)
            </>
          ) : sort === 'desc' ? (
            <>
              <BiSortDown className="text-xl" />
              Sort ↓ (High → Low)
            </>
          ) : (
            <>
              <BiSort className="text-xl" />
              Sort by Bookings
            </>
          )}
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : classes.length === 0 ? (
        <p className="text-center text-white text-lg mt-10">No classes found.</p>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {classes.map((cls, index) => (
            <motion.div
              key={cls._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <ClassCard cls={cls} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      <motion.div
        className="flex justify-center items-center mt-10 gap-3 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 cursor-pointer py-2 rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-lime-500 transition"
        >
          ← Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`px-4 py-2 rounded-full font-semibold transition ${page === n + 1
              ? 'bg-lime-400 text-black'
              : 'bg-gray-800 text-white hover:bg-lime-600'
              }`}
          >
            {n + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 cursor-pointer rounded-full bg-gray-800 text-white disabled:opacity-50 hover:bg-lime-500 transition"
        >
          Next →
        </button>
      </motion.div>
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
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 rounded-xl p-4 shadow-md border border-lime-400 flex flex-col w-full"
      style={{ minHeight: '480px' }}
    >
      <img
        src={cls.image}
        alt={cls.name}
        className="w-full h-48 object-cover rounded-lg mb-3 flex-shrink-0"
      />
      <h3 className="text-xl font-semibold">{cls.name}</h3>
      <p className="text-sm text-gray-300 flex-grow">{cls.details}</p>
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
    </motion.div>
  );
};

export default AllClasses;
