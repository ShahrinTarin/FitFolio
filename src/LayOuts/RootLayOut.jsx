import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar';



const RootLayOut = () => {
    return (
        <div className='bg-black'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayOut;