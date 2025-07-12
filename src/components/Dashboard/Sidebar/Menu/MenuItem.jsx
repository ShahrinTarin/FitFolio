import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-100 transform  hover:bg-gray-300   hover:text-lime-700 ${
          isActive ? 'bg-lime-400  text-black' : 'text-gray-200'
        }`
      }
    >
      <Icon className='w-5 h-5 ' />

      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem