import { use, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { AuthContext } from '@/Provider/AuthProvider'
import AdminMenu from './Menu/AdminMenu'
import Member from './Menu/Member'
import { FaComments, FaHome } from 'react-icons/fa'
import MenuItem from './Menu/MenuItem'
import { Link } from 'react-router'

const Sidebar = () => {
    const { logOut } = use(AuthContext)
    const [isActive, setIsActive] = useState(false)

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setIsActive(!isActive)
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className=' text-gray-500  flex justify-between md:hidden'>
                <div>
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
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none '
                >
                    <AiOutlineBars className='h-6 w-6 text-lime-700' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-white/10 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div className='hidden md:block'>
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
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            <MenuItem icon={ FaHome} label='Back to Home' address='/' />
                            {/* Menu Items */}
                            <AdminMenu />
                            <Member></Member>
                            <MenuItem icon={FaComments} label='Add new Forum' address='/dashboard/add-forum' />
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />


                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-200 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar