import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const TrainerCard = ({ trainer, onKnowMore }) => {
  const {
    fullName,
    profileImage,
    experience,
    facebook,
    linkedin,
    skills = [],
    availableDays = [],
    availableTime,
  } = trainer;

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="relative rounded-3xl bg-gradient-to-br from-black/70 via-[#0f0f0f]/60 to-black/90 border border-lime-400/30 shadow-2xl backdrop-blur-lg p-6 sm:p-8 text-white overflow-hidden group"
    >
      {/* Neon Ring Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-lime-400/20 via-transparent to-lime-400/10 blur-2xl z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <motion.img
          src={profileImage || 'https://i.ibb.co/gFJ58yVW/user.png'}
          alt="Trainer"
          className="w-24 h-24 rounded-full border-4 border-lime-400 object-cover shadow-xl"
          whileHover={{ scale: 1.1 }}
        />

        {/* Name */}
        <h2 className="text-2xl font-extrabold tracking-wide text-lime-300 uppercase">
          {fullName}
        </h2>

        {/* Experience */}
        <p className="text-gray-400 text-sm">
          {experience}+ Years Experience
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2">
          {skills.length ? skills.map((skill, idx) => (
            <span key={idx} className="bg-lime-400/10 border border-lime-300/30 text-lime-300 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
              {skill}
            </span>
          )) : <span className="italic text-gray-500">No skills listed</span>}
        </div>

        {/* Availability */}
        <div className="text-xs text-gray-400 mt-1">
          <strong className="text-white">Available:</strong> {availableDays.join(', ') || 'N/A'} • {availableTime || 'N/A'}
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-xl mt-3">
          {facebook && facebook !== 'fs' && (
            <a href={facebook} onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
              <FaFacebook />
            </a>
          )}
          {linkedin && linkedin !== 'sf' && (
            <a href={linkedin} onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-400">
              <FaLinkedin />
            </a>
          )}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#A3E635', color: '#000' }}
          onClick={(e) => { e.stopPropagation(); onKnowMore(); }}
          className="mt-4 px-6 py-2 border border-lime-300 text-lime-300 font-semibold rounded-full uppercase tracking-widest transition-all duration-300 hover:bg-lime-400 hover:text-black"
        >
          Know More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TrainerCard;
