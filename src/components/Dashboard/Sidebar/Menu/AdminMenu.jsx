import { FaChalkboardTeacher, FaClipboardCheck, FaEnvelopeOpenText, FaUserTie, FaWallet } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label='Statistics' address='/dashboard' />
      <MenuItem icon={FaEnvelopeOpenText} label='All Newsletter' address='/dashboard/newsletter' />
      <MenuItem icon={FaUserTie } label='All Trainers' address='/dashboard/trainers' />
      <MenuItem icon={FaClipboardCheck} label='Applied Trainer' address='/dashboard/applied-trainers' />
      <MenuItem icon={FaWallet} label='Balance' address='/dashboard/balance' />
      <MenuItem icon={FaChalkboardTeacher} label='Add new Class' address='/dashboard/add-class' />
    </>
  )
}

export default AdminMenu