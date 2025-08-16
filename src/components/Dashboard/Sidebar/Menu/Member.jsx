import React from 'react';
import MenuItem from './MenuItem';
import { FaHistory,FaUserCheck } from 'react-icons/fa';


const Member = () => {
    return (
        <>
            <MenuItem icon={FaHistory} label='Activity Log' address='/dashboard/activity-log' />
            <MenuItem icon={FaUserCheck} label='Booked Trainer' address='/dashboard/booked-trainer' />
            
        </>
    );
};

export default Member;