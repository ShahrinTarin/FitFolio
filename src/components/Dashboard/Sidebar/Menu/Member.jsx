import React from 'react';
import MenuItem from './MenuItem';
import { FaHistory, FaIdBadge, FaUserCheck } from 'react-icons/fa';


const Member = () => {
    return (
        <>
            <MenuItem icon={FaHistory} label='Activity Log' address='/dashboard/activity-log' />
            <MenuItem icon={FaUserCheck} label='Booked Trainer' address='/dashboard/booked-trainer' />
            <MenuItem
                icon={FaIdBadge}
                label='Profile'
                address='/dashboard/profile'
            />
        </>
    );
};

export default Member;