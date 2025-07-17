import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/Shared/Loader';
import { FaClock } from 'react-icons/fa';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: trainer, isLoading, isError } = useQuery({
    queryKey: ['trainer', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/trainerdetails/${id}`);
      return res.data;
    },
  });

  const { data: slots = [], isLoading: loadingSlots } = useQuery({
    queryKey: ['slots', trainer?.email],
    enabled: !!trainer?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/slots/trainers/${trainer.email}`
      );
      return res.data;
    },
  });

  if (isLoading || loadingSlots) return <Loader />;
  if (isError || !trainer)
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Trainer not found.
      </div>
    );

  const {
    fullName,
    profileImage,
    experience,
    facebook,
    linkedin,
    otherInfo,
    skills = [],
  } = trainer;

  return (
    <div
      className="min-h-[calc(100vh-84px)] py-10 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.postimg.cc/nzgqXHkq/b3.webp')" }}
    >
      <div className="min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl text-center mt-5 text-lime-700 font-extrabold mb-10 dancing-font drop-shadow-lg"
        >
          Trainer Details
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-lime-300 p-6 md:p-8 flex flex-col md:flex-row items-center gap-10"
        >
          <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg flex items-center justify-center">
            <img
              src={profileImage || 'https://i.ibb.co/gFJ58yVW/user.png'}
              alt={fullName}
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{fullName}</h2>
            <p className="text-gray-700 text-sm">
              <strong>Experience:</strong> {experience} {experience === 1 ? 'year' : 'years'}
            </p>

            <div>
              <h4 className="text-lime-600 text-sm font-bold uppercase tracking-wider">Skills</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                {skills.length > 0 ? (
                  skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-lime-200 text-lime-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic">No skills listed</span>
                )}
              </div>
            </div>

            {otherInfo && (
              <p className="text-sm text-gray-600 italic border-l-4 border-lime-500 pl-4">
                {otherInfo}
              </p>
            )}

            <div className="flex justify-center md:justify-start gap-4 text-2xl mt-3">
              {facebook && facebook !== 'fs' && (
                <a href={facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-facebook-square" />
                </a>
              )}
              {linkedin && linkedin !== 'sf' && (
                <a href={linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
                  <i className="fab fa-linkedin" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Slots Section */}
        <div className="max-w-5xl mx-auto mt-12 bg-white rounded-3xl shadow-xl border border-lime-200 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-lime-700 mb-4">Available Slots</h3>

          {slots.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {slots.map((slot) => (
                <motion.button
                  key={slot._id}
                  onClick={() =>
                    navigate(`/trainerbook/${id}`, {
                      state: {
                        trainer,
                        slotName: slot.slotName,
                        className: slot.className,
                        slotId: slot._id,
                        classId: slot.classId,
                      },
                    })
                  }
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-52 bg-white rounded-xl p-5 cursor-pointer shadow-md flex flex-col items-center justify-center border border-gray-200 transition duration-300 hover:border-lime-500"
                >
                  <FaClock className="text-lime-600 mb-2 text-2xl" />
                  <span className="text-lg font-bold text-gray-900">{slot.slotName}</span>
                  <span className="text-sm italic text-gray-500 mt-1">{slot.className}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center">No available slots</p>
          )}
        </div>

        <div className="text-center mt-14 mb-10">
          <button
            onClick={() => navigate('/betrainer')}
            className="bg-gradient-to-r from-gray-900 to-lime-600 text-white font-bold text-lg px-10 py-3 rounded-full shadow-xl hover:shadow-2xl transition duration-300 hover:scale-105"
          >
            Become a Trainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
