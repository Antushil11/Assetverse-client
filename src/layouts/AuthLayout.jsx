import React from 'react';
import logo from "../../src/assets/Logo design for Asse.png";
import { Link, Outlet } from 'react-router';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Link to={'/'}>
                <img className='w-2xs' src={logo} alt="" />
            </Link>

            <div className='min-h-screen'><Outlet></Outlet></div>
            

            
        </div>
    );
};

export default AuthLayout;