import { FaChalkboardTeacher, FaClipboardCheck, FaEnvelopeOpenText, FaUserTie, FaWallet } from 'react-icons/fa'
import MenuItem from './MenuItem'
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaWallet} label='Overview' address='/dashboard/balance' />
      <MenuItem icon={FaEnvelopeOpenText} label='All Newsletter' address='/dashboard/newsletter' />
      <MenuItem icon={FaUserTie } label='All Trainers' address='/dashboard/trainers' />
      <MenuItem icon={FaClipboardCheck} label='Applied Trainer' address='/dashboard/applied-trainers' />
      <MenuItem icon={FaChalkboardTeacher} label='Add new Class' address='/dashboard/add-class' />
    </>
  )
}

export default AdminMenu