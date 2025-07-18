import CheckoutForm from '@/Component/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const { state } = useLocation();
    const [pageTitle, setPageTitle] = useState('FitFolio');

  useEffect(() => {
    const newTitle = 'FitFolio | PaymentPage';
    setPageTitle(newTitle);
    document.title = newTitle;

  }, [])
  const {
    trainer,
    slotName,
    selectedPackage,
    selectedClass,
    selectedSlot,
    day,
    time,
    userinfo,
  } = state || {};
  return (
    <div
      className="min-h-[calc(100vh-84px)] py-12 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/DfgcLgqD/4.jpg')" }}
    >
       <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl text-center text-lime-700 font-extrabold mb-10 dancing-font drop-shadow-lg"
      >
        Complete Your Payment
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-lime-300 p-8 space-y-8"
      >
        {/* Info Display */}
        <div className="grid md:grid-cols-2 gap-6 text-gray-800">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-lime-700 mb-1">Trainer & Slot Info</h2>
            <p><strong>Trainer:</strong> {trainer?.fullName}</p>
            <p><strong>Slot:</strong> {slotName}</p>
            <p><strong>Day:</strong> {day}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Class:</strong> {selectedClass?.name}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-lime-700 mb-1">Membership Info</h2>
            <p><strong>Package:</strong> {selectedPackage?.name}</p>
            <p><strong>Price:</strong> ${selectedPackage?.price}</p>
            <ul className="list-disc text-sm ml-5 mt-1 text-gray-600">
              {selectedPackage?.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* User Info */}
        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-xl font-bold text-lime-700 mb-2">Your Info</h2>
          <div className="flex items-center gap-4">
            <img
              src={userinfo?.photo || 'https://i.ibb.co/gFJ58yVW/user.png'}
              alt="User"
              className="w-16 h-16 rounded-full border-2 border-lime-400 shadow"
            />
            <div>
              <p><strong>Name:</strong> {userinfo?.fullName}</p>
              <p><strong>Email:</strong> {userinfo?.email}</p>
            </div>
          </div>
        </div>

        {/* Stripe Checkout Form */}
        <div className="pt-6 border-t border-gray-300">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              price={selectedPackage?.price}
              trainer={trainer}
              slotName={slotName}
              slotId={selectedSlot?._id}
              day={day}
              time={time}
              selectedClass={selectedClass}
              selectedSlot={selectedSlot}
              packageName={selectedPackage?.name}
              classId={selectedClass?._id}
              user={userinfo}
            />
          </Elements>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
