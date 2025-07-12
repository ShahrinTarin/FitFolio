import React, { use,  useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { motion } from 'framer-motion';
import SocialLogin from '../Shared/SocialLogin';

const Login = () => {
 const { signIn, setUser,  email, setEmail,setLoading } = use(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
   

    const handleLogIn = async(e) => {
        e.preventDefault()
        const form = e.target
        const password = form.password.value
        const email = form.email.value
         try {
            setLoading(true);
            const result = await signIn(email, password);
            setUser(result.user);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged in successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(`${location.state ? location.state : '/'}`)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Invalid credentials",
                icon: "error",
                timer: 1500
            });
        } finally {
            setLoading(false);
        }

    }
  return (
    <div className="relative min-h-[calc(100vh-84px)] flex items-center justify-center bg-black overflow-hidden">
      {/* ---- Animated Waves ---- */}
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

      {/* ---- Glassmorphic Card ---- */}
      <motion.div
        className="relative z-10 w-full m-5 my-5 lg:mx-0 lg:w-[100%] max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left image */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/35Jnw0PS/pexels-victorfreitas-841130.jpg')`,
          }}
        />
        {/* Right form */}
        <div className="flex items-center justify-center p-12">
          <motion.div
            className="w-full max-w-md text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
              Welcome back!
            </h2>

            <SocialLogin></SocialLogin>
            <div className="flex items-center my-6 text-gray-300">
              <hr className="flex-grow border-gray-500" />
              <span className="px-4 text-lg">OR LOGIN WITH EMAIL</span>
              <hr className="flex-grow border-gray-500" />
            </div>

            <form onSubmit={handleLogIn} className="space-y-6">
              <div>
                <label className="block text-gray-300 text-base mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white/30 border border-white/40 text-black focus:outline-none focus:ring-4 focus:ring-lime-400 backdrop-filter backdrop-blur-md"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-300 text-base mb-2">Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  required
                  className="w-full px-6 py-4 rounded-xl bg-white/30 border border-white/40 text-black focus:outline-none focus:ring-4 focus:ring-lime-400 backdrop-filter backdrop-blur-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-14 right-5 text-gray-300 hover:text-white transition"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-lime-300 text-black font-bold text-lg hover:bg-lime-400 transition"
              >
                Sign In
              </motion.button>
            </form>

            <div className="text-center text-base mt-6 text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-lime-300 hover:underline font-semibold">
                SIGN UP
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
