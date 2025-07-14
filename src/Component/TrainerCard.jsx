import React from 'react';
import { motion } from 'framer-motion';

const TrainerCard = ({ trainer, onKnowMore }) => {
  const {
    fullName,
    profileImage,
    experience,
    facebook,
    linkedin,
    otherInfo,
    skills = [],
    availableDays = [],
    availableTime,
  } = trainer;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(132, 204, 22, 0.6)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-gradient-to-br from-lime-400 via-white to-black border border-lime-300 rounded-3xl p-6 cursor-pointer select-none"
      onClick={onKnowMore}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onKnowMore(); }}
      aria-label={`Know more about trainer ${fullName}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <motion.img
            src={profileImage || 'https://i.ibb.co/gFJ58yVW/user.png'}
            alt={`${fullName}'s profile`}
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-0 right-0 bg-black text-lime-300 text-xs px-3 py-1 rounded-full font-bold shadow-lg select-none"
          >
            Trainer
          </motion.span>
        </div>

        <h2 className="text-3xl mt-4 font-extrabold text-black uppercase tracking-wide drop-shadow-md">
          {fullName}
        </h2>
        <p className="text-sm text-gray-700 mb-3 font-semibold tracking-wide">
          Experience: <span className="text-black">{experience} {experience === 1 ? 'year' : 'years'}</span>
        </p>

        <div className="mt-3 w-full">
          <p className="text-xs text-gray-500 font-bold uppercase mb-1 tracking-wider">Skills</p>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-black text-lime-300 px-3 py-1 rounded-full text-xs font-semibold shadow-lg cursor-default select-text"
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              <span className="italic text-gray-400">N/A</span>
            )}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700 font-medium tracking-wide">
          <p>
            <strong className="text-black">Available:</strong>{' '}
            {availableDays.length > 0 ? (
              availableDays.join(', ')
            ) : (
              <span className="italic text-gray-400">N/A</span>
            )}{' '}
            <span className="font-semibold text-black">({availableTime || 'N/A'})</span>
          </p>
        </div>

        {otherInfo && (
          <p className="mt-4 px-3 text-center text-sm text-gray-700 font-medium italic tracking-wide">
            {otherInfo}
          </p>
        )}

        <div className="flex gap-6 justify-center mt-5">
          {facebook && facebook !== 'fs' && (
            <motion.a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              whileHover={{ scale: 1.2, color: '#2563EB' }}
              className="text-blue-600 text-3xl drop-shadow"
              onClick={e => e.stopPropagation()}
            >
              <i className="fab fa-facebook-square" />
            </motion.a>
          )}
          {linkedin && linkedin !== 'sf' && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              whileHover={{ scale: 1.2, color: '#1E40AF' }}
              className="text-blue-700 text-3xl drop-shadow"
              onClick={e => e.stopPropagation()}
            >
              <i className="fab fa-linkedin" />
            </motion.a>
          )}
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onKnowMore();
          }}
          whileHover={{ scale: 1.05, backgroundColor: '#A3E635', color: '#000' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mt-7 bg-black text-lime-300 px-8 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg"
          aria-label={`Know more about ${fullName}`}
        >
          Know More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TrainerCard;
