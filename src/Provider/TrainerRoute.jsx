import useRole from '@/hooks/useRole'
import Loader from '@/Shared/Loader'
import { Navigate} from 'react-router'


const TrainerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <Loader></Loader>
  if (role === 'trainer') return children
  return <Navigate to='/' replace='true' />
}

export default TrainerRoute