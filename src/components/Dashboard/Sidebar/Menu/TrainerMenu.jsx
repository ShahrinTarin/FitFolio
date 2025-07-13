import React from 'react';
import { FaPlusSquare, FaTasks } from 'react-icons/fa';
import MenuItem from './MenuItem';

const TrainerMenu = () => {
    return (
        <>
            <MenuItem icon={FaTasks} label='Manage Slots' address='/dashboard/manage-slots' />
            <MenuItem icon={FaPlusSquare} label='Add New slot' address='/dashboard/add-slot' />
            
        </>
    );
};

export default TrainerMenu;