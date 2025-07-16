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

  // Fetch classes
  const { data: classes = [], isLoading: loadingClasses } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/classes');
      return res.data;
    },
  });

  // Fetch slots
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
    const selectedClass = classes.find((cls) => cls._id === selectedClassId);
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
      className="min-h-[calc(100vh-84px)] py-12 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/FqKDJPJn/5.jpg')" }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl text-center text-lime-700 font-extrabold mb-10 dancing-font drop-shadow-lg"
      >
        Trainer Booking Summary
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto bg-white/90 rounded-3xl shadow-xl border border-lime-300 p-6 md:p-10 space-y-10"
      >
        {/* Trainer Info */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Trainer: {trainer?.fullName}
          </h2>
          <p><strong>Trainer Email:</strong> {trainer?.email}</p>
          <p><strong>Slot Name:</strong> {slotName}</p>
        </div>

        {/* Slots Selection */}
        <div>
          <h3 className="text-xl font-bold text-lime-700 mb-4">Select a Slot</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slots.map((slot) => (
              <div
                key={slot._id}
                onClick={() => setSelectedSlotId(slot._id)}
                className={`cursor-pointer p-4 rounded-2xl transition-all duration-200 shadow-md ${selectedSlotId === slot._id
                    ? 'border-2 border-lime-600 bg-lime-50'
                    : 'border border-gray-200 hover:border-lime-400'
                  }`}
              >
                <h4 className="text-lg font-semibold text-gray-800">{slot.slotName}</h4>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {slot.slotTime}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Days:</strong> {slot.days.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Class:</strong> {slot.className}
                </p>
                <p className="text-sm text-gray-600">{slot.otherInfo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Class Selection */}
        <div>
          <h3 className="text-xl font-bold text-lime-700 mb-4">Select a Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls) => (
              <div
                key={cls._id}
                onClick={() => setSelectedClassId(cls._id)}
                className={`cursor-pointer p-4 rounded-2xl transition-all duration-200 shadow-md ${selectedClassId === cls._id
                    ? 'border-2 border-lime-600 bg-lime-50'
                    : 'border border-gray-200 hover:border-lime-400'
                  }`}
              >
                <h4 className="text-lg font-semibold text-gray-800">{cls.name}</h4>
                <p className="text-sm text-gray-600">{cls.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Selection */}
        <div>
          <h3 className="text-xl font-bold text-lime-700 mb-4">Choose a Membership Package</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPackage(pkg)}
                className={`cursor-pointer rounded-2xl p-5 transition-all shadow-2xl ${selectedPackage?.name === pkg.name
                    ? 'border-2 border-lime-600 bg-lime-50'
                    : 'border border-gray-200 hover:border-lime-400'
                  }`}
              >
                <h4 className="text-lg font-bold text-gray-800">{pkg.name}</h4>
                <p className="text-lime-600 font-semibold mt-1">Price: ${pkg.price}</p>
                <ul className="list-disc mt-2 ml-4 text-sm text-gray-700">
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
            className="bg-gradient-to-r from-gray-900 to-lime-600 text-white font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainerBooked;
