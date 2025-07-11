import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { motion } from 'framer-motion';

const Register = () => {
  const { createUser, setUser, googleLogIn, updateUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: 'success',
          title: 'Logged in with Google!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state || '/');
      })
      .catch((err) => showError(err.code));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photoURL.value;
    const password = form.password.value;

    const passDigitExpresion = /^(?=.*\d)/;
    const passLowerCaseExpresion = /(?=.*[a-z])/;
    const passUpperCaseExpresion = /(?=.*[A-Z])/;
    const passLongExpresion = /.{6,}$/;
    const passSpecialExpresion = /(?=.*[!@#$%^&*])/;

    if (!passLongExpresion.test(password)) {
      return showError('Password must be at least 6 characters long');
    }
    if (!passDigitExpresion.test(password)) {
      return showError('Password must contain at least one digit');
    }
    if (!passLowerCaseExpresion.test(password)) {
      return showError('Password must contain at least one lowercase letter');
    }
    if (!passUpperCaseExpresion.test(password)) {
      return showError('Password must contain at least one uppercase letter');
    }
    if (!passSpecialExpresion.test(password)) {
      return showError('Password must contain at least one special character');
    }

    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...result.user, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            showError(error.message);
            setUser(result.user);
          });

        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state || '/');
      })
      .catch((error) => showError(error.code));
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogIn}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white/40 py-3 rounded-xl hover:bg-white/50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-semibold text-black text-base">Sign up with Google</span>
            </motion.button>

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
