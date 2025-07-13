import useRole from '@/hooks/useRole'
import Loader from '@/Shared/Loader'
import { Navigate} from 'react-router'


const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <Loader></Loader>
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute