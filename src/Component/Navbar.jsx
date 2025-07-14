import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaComments,
  FaTachometerAlt,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
    localStorage.removeItem('token')
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {});
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "All Trainers", path: "/alltrainers", icon: <FaChalkboardTeacher /> },
    { name: "All Classes", path: "/classes", icon: <FaUsers /> },
    { name: "Forums", path: "/forums", icon: <FaComments /> },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <motion.nav
      className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-xl"
      initial={{ boxShadow: "0 0 0px #C4F93F" }}
      animate={{
        boxShadow: [
          "0 0 0px #C4F93F",
          "0 0 10px #C4F93F",
          "0 0 20px #C4F93F",
          "0 0 10px #C4F93F",
          "0 0 0px #C4F93F",
        ],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      {/* Logo */}
      <div className="text-lime-400 font-bold text-lg sm:text-xl min-w-0">
        <Link to="/">
          <svg width="170" height="50" viewBox="0 0 200 60">
            <g fill="#C4F93F">
              <path d="M10 15h30l-5 10H10z" />
              <path d="M10 30h20l-5 10H10z" />
            </g>
            <text
              x="50"
              y="40"
              fontFamily="Poppins, Arial, sans-serif"
              fontWeight="bold"
              fontSize="24"
              fill="#C4F93F"
            >
              FitFolio
            </text>
          </svg>
        </Link>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex flex-wrap items-center gap-4 text-white font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 text-sm transition-all duration-700 ease-in-out after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-400 after:origin-left after:transition-all after:duration-700 after:ease-in-out ${
                  isActive
                    ? "text-lime-400 font-semibold after:w-full"
                    : "text-white hover:text-lime-400 after:w-0 hover:after:w-full"
                }`
              }
            >
              <span>{link.icon}</span>
              {link.name}
            </NavLink>
          </li>
        ))}
        {user && (
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 text-sm transition-all duration-700 ease-in-out after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-400 after:origin-left after:transition-all after:duration-700 after:ease-in-out ${
                  isActive
                    ? "text-lime-400 font-semibold after:w-full"
                    : "text-white hover:text-lime-400 after:w-0 hover:after:w-full"
                }`
              }
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>

      {/* Profile or Login */}
      <div className="hidden lg:flex items-center space-x-3 min-w-fit">
        {user ? (
          <>
            <img
              src={user.photoURL || "https://i.ibb.co/8xMFbRh/avatar1.jpg"}
              alt="profile"
              className="w-8 h-8 rounded-full border-2 border-lime-400"
            />
            <button
              onClick={handleLogOut}
              className="text-lime-400 border border-lime-400 px-3 py-1.5 rounded-full hover:bg-lime-400 hover:text-black transition-all duration-300 text-sm font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-1.5 rounded-full font-semibold bg-lime-400 text-black hover:bg-lime-500 text-sm"
          >
            Login / Register
          </NavLink>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden flex items-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="text-lime-400 focus:outline-none"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="absolute top-20 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md flex flex-col items-center space-y-4 py-6 text-white font-medium lg:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-lg transition-all duration-700 ease-in-out after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-400 after:origin-left after:transition-all after:duration-700 after:ease-in-out ${
                    isActive
                      ? "text-lime-400 font-semibold after:w-full"
                      : "text-white hover:text-lime-400 after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-lg text-white hover:text-lime-400"
              >
                <FaTachometerAlt />
                Dashboard
              </NavLink>
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="text-lime-400 border border-lime-400 px-4 py-2 rounded-full hover:bg-lime-400 hover:text-black transition-all duration-300 font-semibold"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-full font-semibold bg-lime-400 text-black hover:bg-lime-500"
              >
                Login / Register
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
