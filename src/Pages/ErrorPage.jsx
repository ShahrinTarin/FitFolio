import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'ErrorPage';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6 py-12">
       <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: .8, rotate: [0, 10, -10, 0] }}
        transition={{ type: 'keyframes', duration: 2, repeat: Infinity }}
      >
        <FaExclamationTriangle className="text-lime-400 text-[10rem] mb-8 drop-shadow-lg" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-6xl font-extrabold mb-6 text-lime-400 drop-shadow-md"
      >
        Oops! Something went wrong.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-xl text-gray-300 mb-12 max-w-lg text-center leading-relaxed"
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg shadow-lg transition"
      >
        Go to Homepage
      </motion.a>
    </div>
  );
};

export default ErrorPage;
