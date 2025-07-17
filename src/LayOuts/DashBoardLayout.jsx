import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import useRole from '@/hooks/useRole';
import Loader from '@/Shared/Loader';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router'


const DashboardLayout = () => {

   const [role, isRoleLoading] = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect based on role when landing on /dashboard
  useEffect(() => {
    if (!isRoleLoading && location.pathname === '/dashboard') {
      if (role === 'admin') {
        navigate('/dashboard/balance');
      } else if (role === 'trainer') {
        navigate('/dashboard/manage-slots');
      } else {
        navigate('/dashboard/activity-log');
      }
    }
  }, [role, isRoleLoading, location.pathname, navigate]);

  if (isRoleLoading) return <Loader />;

  return (
    <div className='relative min-h-screen md:flex bg-black'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='min-h-screen  w-full bg-black'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout