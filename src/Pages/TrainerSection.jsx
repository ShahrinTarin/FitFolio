import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TrainerCard from '@/Component/TrainerCard';

const TrainerSection = () => {
  const navigate = useNavigate();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['approvedTrainers'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/trainers/approved');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load trainers.</div>;
  if (trainers.length === 0) return <div className="text-center text-gray-500 py-10">No approved trainers found.</div>;

  return (
    <section className="md:w-11/12 w-full mt-8 mb-16 mx-auto">
      <h2 className="text-3xl md:text-4xl text-center text-lime-400 font-extrabold mb-6 dancing-font drop-shadow-lg">
        All Trainers
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer._id}
            trainer={trainer}
            onKnowMore={() => navigate(`/trainerdetails/${trainer._id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TrainerSection;
