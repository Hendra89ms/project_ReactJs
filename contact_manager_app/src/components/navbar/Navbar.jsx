import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMobile } from 'react-icons/ai'

export default function Navbar() {
    return (
        <>

            <nav className='w-full bg-black h-[60px] flex items-center pl-28 fixed z-[99]'>
                <div className='flex items-center gap-1'>
                    <AiOutlineMobile size={24} color='orange'></AiOutlineMobile> <Link to={'/'} className='text-white text-xl'>Contact <span className='text-orange-300'>Manager</span> </Link>
                </div>
            </nav>
        </>
    );
}
