import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar';
import Footer from '@/Component/Footer';



const RootLayOut = () => {
    return (
        <div className='bg-black'>
            <Navbar></Navbar>
           <div className='min-h-[calc(100vh-84px)]'>
             <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;