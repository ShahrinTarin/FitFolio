import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-lime-950  text-[#D5FF6D] md:px-16 lg:px-32 px-8 py-10 flex flex-col md:flex-row justify-between md:items-start items-center text-center md:text-left">
            {/* Logo & Name */}
            <div className="mb-8 md:mb-0">
                <Link to='/'>
                <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">

                    <g fill="#C4F93F">
                        <path d="M10 15h30l-5 10H10z" />
                        <path d="M10 30h20l-5 10H10z" />
                    </g>


                    <text x="50" y="40" fontFamily="Poppins, Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#C4F93F">
                        FitFolio
                    </text>
                </svg>
                </Link>
                <p className="text-white text-sm max-w-xs leading-relaxed mb-2">
                    Your Go-To For Personalized Workouts, Meal Plans, And Expert Fitness Advice.
                </p>
                <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} FitFolio. All rights reserved.</p>
            </div>

            {/* Contact Info */}
            <div className="mb-8 md:mb-0">
                <h2 className="font-semibold mb-2">Contact Us</h2>
                <p className="text-white text-sm">Email: rahmanshahrintarin@gmail.com</p>
                <p className="text-white text-sm">Phone: +8801619599417</p>
                <p className="text-white text-sm">Address: Sylhet, Bangladesh</p>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center md:items-end">
                <h2 className="font-semibold mb-4">Follow Us</h2>
                <div className="flex space-x-4 mb-4">
                    <a href="https://www.facebook.com/profile.php?id=61570044629513" className="bg-[#D5FF6D] p-2 rounded">
                        <FaFacebookF className="text-black" size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/shahrintarin-rahman/" className="bg-[#D5FF6D] p-2 rounded">
                        <FaLinkedinIn className="text-black" size={20} />
                    </a>
                    <a href="https://www.instagram.com/_shahrin_tarin/" className="bg-[#D5FF6D] p-2 rounded">
                        <FaInstagram className="text-black" size={20} />
                    </a>
                    <a href="https://x.com/" className="bg-[#D5FF6D] p-2 rounded">
                        <FaXTwitter className="text-black" size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
