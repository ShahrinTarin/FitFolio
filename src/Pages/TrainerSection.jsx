import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useNavigate } from 'react-router';
import TrainerCard from '@/Component/TrainerCard';

const TrainerSection = () => {
  const navigate = useNavigate();

  const { data: trainers = [], isLoading, error } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/users/trainers');
      return response.data;
    }
  });

  if (isLoading) return <div>Loading trainers...</div>;
  if (error) return <div>Error loading trainers: {error.message}</div>;

  return (
    <div className="trainer-section grid grid-cols-1 md:grid-cols-3 gap-6">
      {trainers.map(trainer => (
        <TrainerCard
          key={trainer._id}
          trainer={trainer}
          onKnowMore={() => navigate(`/trainer/${trainer._id}`)}
        />
      ))}
    </div>
  );
};

export default TrainerSection;
