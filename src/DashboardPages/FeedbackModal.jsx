import React from "react";
import { motion } from "framer-motion";

const FeedbackModal = ({ feedback, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center"
      >
        <h2 className="text-xl font-bold text-red-600 mb-4">Rejection Feedback</h2>
        <p className="text-gray-700">{feedback || "No feedback provided."}</p>
        <button
          onClick={onClose}
          className="mt-6 cursor-pointer px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;
