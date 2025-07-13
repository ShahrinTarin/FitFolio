import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { Outlet } from 'react-router'


const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-black'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className=' min-h-[calc(100vh-84px)]'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout