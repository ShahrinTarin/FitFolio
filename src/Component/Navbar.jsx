import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
const Navbar = () => {
    const {user,logOut}=use(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
 const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "You Logged Out Successfully",
                showConfirmButton: false,
                timer: 1500
            });
           
        }).catch(() => {
            // An error happened.
        });
    }
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Trainers", path: "/trainers" },
        { name: "All Classes", path: "/classes" },
        { name: "Community", path: "/community" },
    ];

    return (
        <nav className="relative z-20 bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-full mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-lime-400 font-bold text-xl"><Link to="/"><svg width="200" height="50" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">

                <g fill="#C4F93F">
                    <path d="M10 15h30l-5 10H10z" />
                    <path d="M10 30h20l-5 10H10z" />
                </g>


                <text x="50" y="40" fontFamily="Poppins, Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#C4F93F">
                    FitFolio
                </text>
            </svg></Link> </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-6 text-white font-medium">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "text-lime-400 font-semibold" : "hover:text-lime-400"
                            }
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}

                {user?.role && (
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "text-lime-400 font-semibold" : "hover:text-lime-400"
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                )}
            </ul>

            {/* Right side (Profile / Login) */}
            <div className="hidden md:flex items-center space-x-4">
                {user ? (
                    <>
                        <img
                            src={user.photoURL || "https://i.ibb.co/8xMFbRh/avatar1.jpg"}
                            alt="profile"
                            className="w-8 h-8 rounded-full border-2 border-lime-400"
                        />
                        <button
                            onClick={handleLogOut}
                            className="text-lime-400 border border-lime-400 px-4 py-2 rounded-full hover:bg-lime-400 hover:text-black transition font-semibold"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-lime-500 text-black px-4 py-2 rounded-full font-semibold"
                                : "bg-lime-400 text-black px-4 py-2 rounded-full hover:bg-lime-500 transition font-semibold"
                        }
                    >
                        Login / Register
                    </NavLink>
                )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-lime-400 focus:outline-none"
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
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md flex flex-col items-center space-y-4 py-6 text-white font-medium md:hidden">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "text-lime-400 font-semibold" : "hover:text-lime-400"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    {user?.role && (
                        <NavLink
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "text-lime-400 font-semibold" : "hover:text-lime-400"
                            }
                        >
                            Dashboard
                        </NavLink>
                    )}

                    {user ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="text-lime-400 border border-lime-400 px-4 py-2 rounded-full hover:bg-lime-400 hover:text-black transition font-semibold"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-lime-500 text-black px-4 py-2 rounded-full font-semibold"
                                    : "bg-lime-400 text-black px-4 py-2 rounded-full hover:bg-lime-500 transition font-semibold"
                            }
                        >
                            Login / Register
                        </NavLink>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
