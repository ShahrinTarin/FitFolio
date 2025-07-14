import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosSecure from '@/hooks/useAxiosSecure'; // your secure axios instance

const TrainerDetailsPage = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const axios = axiosSecure();

  // Fetch trainer info
  const {
    data: trainer,
    isLoading: trainerLoading,
    isError: trainerError,
  } = useQuery(['trainer', trainerId], async () => {
    const res = await axios.get(`/api/trainers/${trainerId}`);
    return res.data;
  });

  // Fetch available slots
  const {
    data: slots,
    isLoading: slotsLoading,
    isError: slotsError,
  } = useQuery(['trainerSlots', trainerId], async () => {
    const res = await axios.get(`/api/trainers/${trainerId}/slots`);
    return res.data;
  });

  if (trainerLoading || slotsLoading) return <div>Loading...</div>;
  if (trainerError || !trainer) return <div>Trainer not found.</div>;
  if (slotsError) return <div>Failed to load slots.</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Be A Trainer Section */}
      <BeATrainerSection onClick={() => navigate('/become-trainer')} />

      {/* Trainer Info Section */}
      <TrainerInfoSection trainer={trainer} />

      {/* Available Slots Section */}
      <AvailableSlotsSection 
        slots={slots} 
        onSlotClick={(slotId) => navigate(`/booking/${slotId}`)} 
      />
    </div>
  );
};

const BeATrainerSection = ({ onClick }) => (
  <div className="bg-lime-500 text-black p-6 rounded text-center">
    <h2 className="text-2xl font-bold mb-3">Interested in sharing your expertise?</h2>
    <button
      onClick={onClick}
      className="px-5 py-3 bg-black text-lime-500 font-semibold rounded hover:bg-gray-900 transition"
    >
      Become a Trainer
    </button>
  </div>
);

const TrainerInfoSection = ({ trainer }) => (
  <section className="flex flex-col md:flex-row items-center bg-gray-900 p-6 rounded shadow-lg text-white">
    <img 
      src={trainer.photoURL} 
      alt={trainer.name} 
      className="w-48 h-48 rounded-full object-cover mb-4 md:mb-0 md:mr-6" 
    />
    <div>
      <h3 className="text-3xl font-bold mb-2">{trainer.name}</h3>
      <p className="mb-2">{trainer.details}</p>
      <p className="italic text-lime-400">Expertise: {trainer.expertise}</p>
    </div>
  </section>
);

const AvailableSlotsSection = ({ slots, onSlotClick }) => (
  <section className="bg-gray-800 p-6 rounded shadow-lg text-white">
    <h3 className="text-2xl font-bold mb-4">Available Slots</h3>
    {slots.length === 0 ? (
      <p>No slots available currently.</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {slots.map(slot => (
          <button 
            key={slot._id} 
            onClick={() => onSlotClick(slot._id)}
            className="bg-lime-600 hover:bg-lime-700 transition rounded py-2 font-semibold"
          >
            {slot.time}
          </button>
        ))}
      </div>
    )}
  </section>
);

export default TrainerDetailsPage;
