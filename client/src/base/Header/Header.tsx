import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home', link: '/' },
        { id: 2, text: 'Vite', link: '/vite' },
        { id: 3, text: 'Nest', link: '/nest' },
        { id: 4, text: 'Next', link: '/next' },
        { id: 5, text: 'Contact', link: '/contact' },
    ];

    return (
        <div className='bg-[#1e1e1e] flex justify-between items-center h-24 max-w-[4000px] mx-auto px-4 text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.80)]'>
            {/* Logo and Title */}
            <div className='flex items-center'>
                <img src="/public/logo.png" className="w-10 h-10" alt="logo" />
                <h1 className='ml-2 text-2xl sm:text-3xl font-bold text-[#00df9a]'>INITIALIZE.</h1>
            </div>

            {/* Navigation menu for larger screens */}
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className='p-2 sm:p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                    >
                        <Link to={item.link}>{item.text}</Link>
                    </li>
                ))}
            </ul>

            {/* Menu icon for smaller screens */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
            </div>

            {/* Mobile navigation menu */}
            <ul
                className={
                    nav
                        ? 'fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-900 bg-[#1e1e1e] ease-in-out duration-500 z-[1000]' 
                        : 'fixed top-0 left-[-100%] w-[60%] h-full ease-in-out duration-500'
                }
            >
                <div className='flex items-center m-4'>
                    <img src="/public/logo.png" className="w-10 h-10" alt="logo" />
                    <h1 className='ml-2 text-2xl sm:text-3xl font-bold text-[#00df9a]'>INITIALIZE.</h1>
                </div>

                {navItems.map(item => (
                    <li
                        key={item.id}
                        className='p-4 border-b border-gray-600 hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer bg-[#1e1e1e]'
                    >
                        <Link to={item.link}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Header;
