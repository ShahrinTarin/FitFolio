import React from 'react';

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
    <div className="trainer-card border p-4 rounded shadow-md">
      <img
        src={profileImage || 'https://i.ibb.co/gFJ58yVW/user.png'}
        alt={`${fullName}'s profile`}
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />
      <h2 className="text-xl text-white font-semibold mt-4 text-center">{fullName}</h2>
      <p className="text-center text-gray-600">Experience: {experience} years</p>

      <div className="skills mt-2 text-center">
        <strong>Skills: </strong>
        {skills.length > 0 ? skills.join(', ') : 'N/A'}
      </div>

      <div className="availability mt-2 text-center">
        <strong>Available: </strong>
        {availableDays.length > 0 ? availableDays.join(', ') : 'N/A'} ({availableTime})
      </div>

      <div className="socials flex justify-center gap-4 mt-3">
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
            <i className="fab fa-facebook-square text-blue-600 text-2xl"></i>
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin text-blue-700 text-2xl"></i>
          </a>
        )}
      </div>

      {otherInfo && <p className="mt-3 text-center text-sm text-gray-700">{otherInfo}</p>}

      <button
        onClick={onKnowMore}
        className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Know More
      </button>
    </div>
  );
};

export default TrainerCard;
