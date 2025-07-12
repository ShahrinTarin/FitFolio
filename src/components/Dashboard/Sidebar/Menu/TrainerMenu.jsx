import React from 'react';
import { FaTasks } from 'react-icons/fa';

const TrainerMenu = () => {
    return (
        <>
            <MenuItem icon={FaTasks} label='Manage Slots' address='/dashboard/manage-slots' />
            <MenuItem icon={FaUserCheck} label='Booked Trainer' address='/dashboard/booked-trainer' />
            
        </>
    );
};

export default TrainerMenu;