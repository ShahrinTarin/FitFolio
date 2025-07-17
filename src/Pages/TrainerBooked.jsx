import React, { use, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '@/Shared/Loader';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '@/Provider/AuthProvider';

const TrainerBooked = () => {
  const { user } = use(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trainer, slotName } = state || {};
  const userinfo = {
    fullName: user?.displayName,
    email: user?.email,
    photo: user?.photoURL,
  };

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const { data: classes = [], isLoading: loadingClasses } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/classes');
      return res.data;
    },
  });

  const { data: slots = [], isLoading: loadingSlots } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/slots');
      return res.data;
    },
  });

  if (loadingClasses || loadingSlots) return <Loader />;

  const packages = [
    {
      name: 'Basic Membership',
      price: 10,
      benefits: [
        'Access to gym facilities during regular operating hours.',
        'Use of cardio and strength training equipment.',
        'Access to locker rooms and showers.',
      ],
    },
    {
      name: 'Standard Membership',
      price: 50,
      benefits: [
        'All benefits of the basic membership.',
        'Access to group fitness classes such as yoga, spinning, and Zumba.',
        'Use of additional amenities like a sauna or steam room.',
      ],
    },
    {
      name: 'Premium Membership',
      price: 100,
      benefits: [
        'All benefits of the standard membership.',
        'Access to personal training sessions with certified trainers.',
        'Discounts on additional services such as massage therapy or nutrition counseling.',
      ],
    },
  ];

  const handleJoinNow = () => {
    if (!selectedPackage || !selectedClassId || !selectedSlotId) {
      return Swal.fire(
        'Oops!',
        'Please select a slot, a class and a membership package.',
        'warning'
      );
    }
    const selectedClass = classes?.find((cls) => cls._id === selectedClassId);
    const selectedSlot = slots.find((slot) => slot._id === selectedSlotId);
    navigate('/payment', {
      state: {
        trainer,
        slotName: selectedSlot?.slotName,
        selectedSlot,
        day: selectedSlot?.days?.join(', '),
        time: selectedSlot?.slotTime,
        selectedClass,
        selectedPackage,
        userinfo,
      },
    });
  };

  return (
    <div
      className="min-h-[calc(100vh-84px)] py-12 px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://i.ibb.co/FqKDJPJn/5.jpg')" }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl text-center text-lime-700 font-extrabold mb-12 dancing-font drop-shadow-xl"
      >
        Trainer Booking Summary
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-lime-300 p-6 md:p-10 space-y-12 backdrop-blur-md"
      >
        {/* Trainer Info */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Trainer: {trainer?.fullName}
          </h2>
          <p className="text-gray-600">
            <strong>Email:</strong> {trainer?.email}
          </p>
          <p className="text-gray-600">
            <strong>Slot Name:</strong> {slotName}
          </p>
        </div>

        {/* Slots Selection */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-lime-700 mb-4">
            Select a Slot
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-left text-gray-800">
              <thead className="bg-lime-800 text-gray-200 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 border-b">Slot Name</th>
                  <th className="px-4 py-3 border-b">Time</th>
                  <th className="px-4 py-3 border-b">Days</th>
                  <th className="px-4 py-3 border-b">Other Info</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr
                    key={slot._id}
                    onClick={() => setSelectedSlotId(slot._id)}
                    className={`cursor-pointer hover:bg-gray-300 transition ${
                      selectedSlotId === slot._id ? 'bg-lime-500 font-semibold' : ''
                    }`}
                  >
                    <td className="px-4 py-3 border-b">{slot.slotName}</td>
                    <td className="px-4 py-3 border-b">{slot.slotTime}</td>
                    <td className="px-4 py-3 border-b">{slot.days.join(', ')}</td>
                    <td className="px-4 py-3 border-b">{slot.otherInfo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Class Selection */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-lime-700 mb-4">
            Select a Class
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((cls) => (
              <div
                key={cls._id}
                onClick={() => setSelectedClassId(cls._id)}
                className={`cursor-pointer p-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                  selectedClassId === cls._id
                    ? 'border-2 border-lime-600 bg-lime-50'
                    : 'border border-gray-200 hover:border-lime-400'
                }`}
              >
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h4 className="text-lg font-semibold text-gray-800">{cls.name}</h4>
                <p className="text-sm text-gray-600">{cls.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Selection */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-lime-700 mb-4">
            Choose a Membership Package
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPackage(pkg)}
                className={`cursor-pointer rounded-2xl p-5 transition-all shadow-md hover:shadow-lg hover:scale-105 ${
                  selectedPackage?.name === pkg.name
                    ? 'border-2 border-lime-600 bg-lime-50'
                    : 'border border-gray-200 hover:border-lime-400'
                }`}
              >
                <h4 className="text-lg font-bold text-gray-800">{pkg.name}</h4>
                <p className="text-lime-600 font-semibold mt-1">
                  Price: ${pkg.price}
                </p>
                <ul className="list-disc mt-2 ml-4 text-sm text-gray-700 space-y-1">
                  {pkg.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Join Now Button */}
        <div className="text-center">
          <button
            onClick={handleJoinNow}
            className="bg-gradient-to-r from-lime-600 to-green-700 text-white font-bold text-lg px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition transform hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainerBooked;
