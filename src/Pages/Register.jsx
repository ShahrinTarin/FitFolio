import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import SocialLogin from '../Shared/SocialLogin';

const Register = () => {
  const { createUser, setUser,  updateUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mutation for saving user in MongoDB
  const registerMutation = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axios.post('http://localhost:3000/register', userInfo);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to register user');
      }
      return res.data;
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        Swal.fire('Error', 'User already exists!', 'error');
      } else {
        Swal.fire('Error', error.message, 'error');
      }
    },
  });

 

  // Normal registration handler
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photoURL.value;
    const password = form.password.value;

    // Password validations
    const passDigitExpresion = /^(?=.*\d)/;
    const passLowerCaseExpresion = /(?=.*[a-z])/;
    const passUpperCaseExpresion = /(?=.*[A-Z])/;
    const passLongExpresion = /.{6,}$/;
    const passSpecialExpresion = /(?=.*[!@#$%^&*])/;

    if (!passLongExpresion.test(password))
      return Swal.fire('Error', 'Password must be at least 6 characters long.', 'error');
    if (!passDigitExpresion.test(password))
      return Swal.fire('Error', 'Password must contain a digit.', 'error');
    if (!passLowerCaseExpresion.test(password))
      return Swal.fire('Error', 'Password must contain a lowercase letter.', 'error');
    if (!passUpperCaseExpresion.test(password))
      return Swal.fire('Error', 'Password must contain an uppercase letter.', 'error');
    if (!passSpecialExpresion.test(password))
      return Swal.fire('Error', 'Password must include a special character.', 'error');

    try {
      const result = await createUser(email, password);
      const user = result.user;

      try {
        await updateUser({ displayName: name, photoURL: photo });
        setUser({ ...user, displayName: name, photoURL: photo });
      } catch (error) {
        return Swal.fire('Profile Update Failed', error.message, 'error');
      }

      const userInfo = {
        name,
        email,
        photoURL: photo,
        role: 'member',
      };

      await registerMutation.mutateAsync(userInfo);

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registered successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state?.from || '/');
    } catch (error) {
      Swal.fire('Registration Failed', error.message, 'error');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-84px)] flex items-center justify-center bg-black overflow-hidden">
      {/* Waves */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          fill="none"
          stroke="#bef264"
          strokeWidth="8"
          opacity="0.4"
          d="M0,700 C480,500 960,900 1440,700"
        >
          <animate
            attributeName="d"
            dur="30s"
            repeatCount="indefinite"
            values="
              M0,700 C480,500 960,900 1440,700;
              M0,750 C480,550 960,850 1440,750;
              M0,700 C480,500 960,900 1440,700
            "
          />
        </path>
        <path
          fill="none"
          stroke="#bef264"
          strokeWidth="5"
          opacity="0.2"
          d="M0,800 C480,600 960,1000 1440,800"
        >
          <animate
            attributeName="d"
            dur="40s"
            repeatCount="indefinite"
            values="
              M0,800 C480,600 960,1000 1440,800;
              M0,850 C480,650 960,950 1440,850;
              M0,800 C480,600 960,1000 1440,800
            "
          />
        </path>
      </motion.svg>

      {/* Register Card */}
      <motion.div
        className="relative z-10 w-full m-5 my-5 lg:mx-0 lg:w-[100%] max-w-4xl h-[70%] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left Image */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/35Jnw0PS/pexels-victorfreitas-841130.jpg')`,
          }}
        />

        {/* Right Form */}
        <div className="flex items-center justify-center p-8 md:p-10">
          <motion.div
            className="w-full max-w-md text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
              Create Your Account
            </h2>

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/30 border border-white/40 text-black focus:outline-none focus:ring-4 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/30 border border-white/40 text-black focus:outline-none focus:ring-4 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/30 border border-white/40 text-black focus:outline-none focus:ring-4 focus:ring-lime-400"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-300 text-sm mb-1">Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/30 border border-white/40 text-black focus:outline-none focus:ring-4 focus:ring-lime-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-10 right-5 text-gray-300 hover:text-white transition"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-lime-300 text-black font-bold text-lg hover:bg-lime-400 transition"
              >
                Register
              </motion.button>
            </form>

            <div className="flex items-center my-4 text-gray-300">
              <hr className="flex-grow border-gray-500" />
              <span className="px-3 text-sm">OR REGISTER WITH GOOGLE</span>
              <hr className="flex-grow border-gray-500" />
            </div>


            <SocialLogin></SocialLogin>

            <p className="text-center text-sm mt-4 text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-lime-300 hover:underline font-semibold">
                LOGIN
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
