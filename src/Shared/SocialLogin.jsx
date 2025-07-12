import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const SocialLogin = () => {
  const { googleLogIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // React Query mutation to save user info in backend
  const saveUserMutation = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/social-login`, userInfo);
      return res.data;
    },
    onError: (error) => {
      Swal.fire('Error', error.response?.data?.message || error.message, 'error');
    },
  });

  const handleGoogleLogIn = async () => {
    try {
      const result = await googleLogIn();
      const user = result.user;
      setUser(user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'member',
      };

      // Save user info on backend and handle UI accordingly
      saveUserMutation.mutate(userInfo, {
        onSuccess: async () => {
          await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged in with Google successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location.state?.from || '/');
        },
      });
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleLogIn}
        disabled={saveUserMutation.isLoading}
        className={`w-full flex items-center justify-center gap-3 border border-gray-300 bg-white/40 py-3 rounded-xl hover:bg-white/50 transition ${
          saveUserMutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FcGoogle size={22} />
        <span className="font-semibold text-black text-base">Sign up with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialLogin;
