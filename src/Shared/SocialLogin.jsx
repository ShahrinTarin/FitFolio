import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
const SocialLogin = () => {
    const {googleLogIn, setUser}=use(AuthContext)
    const navigate=useNavigate()
     // Google login handler
      const handleGoogleLogIn = async () => {
        try {
          const result = await googleLogIn();
          const user = result.user;
          setUser(user);
    
        //   const userInfo = {
        //     name: user.displayName,
        //     email: user.email,
        //     photoURL: user.photoURL,
        //     role: 'member',
        //   };
    
        //   await registerMutation.mutateAsync(userInfo);
    
          await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged in with Google successfully',
            showConfirmButton: false,
            timer: 1500,
          });
    
          navigate(location.state?.from || '/');
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
              className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white/40 py-3 rounded-xl hover:bg-white/50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-semibold text-black text-base">Sign up with Google</span>
            </motion.button>
    
        </div>
    );
};

export default SocialLogin;