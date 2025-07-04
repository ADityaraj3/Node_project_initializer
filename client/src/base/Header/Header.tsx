import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home', link: '/' },
        { id: 2, text: 'Vite', link: '/vite' },
        { id: 3, text: 'Nest', link: '/nest' },
        { id: 4, text: 'Next', link: '/next' },
        { id: 5, text: 'Express', link: '/express' },
        { id: 6, text: 'Angular', link: '/angular' },
        { id: 7, text: 'Contact', link: '/contact' },
    ];

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`;

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-darker/90 backdrop-blur-md shadow-lg' : 'bg-dark'}`}>
            <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-4'>
                <NavLink to="/" className='flex items-center gap-2'>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">I</div>
                    <h1 className='text-2xl font-bold'>
                        <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>INITIALIZE</span>
                    </h1>
                </NavLink>

                <nav className='hidden md:flex items-center space-x-2'>
                    {navItems.map(item => (
                        <NavLink key={item.id} to={item.link} className={navLinkClasses}>
                            {item.text}
                        </NavLink>
                    ))}
                </nav>

                <button onClick={handleNav} className='block md:hidden text-2xl' aria-label="Toggle menu">
                    {nav ? <HiX className="text-white" /> : <HiMenuAlt3 className="text-white" />}
                </button>
            </div>

            <AnimatePresence>
                {nav && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-darker border-t border-gray-800"
                    >
                        <nav className='flex flex-col p-4 space-y-3'>
                            {navItems.map(item => (
                                <NavLink 
                                    key={item.id} 
                                    to={item.link} 
                                    className={navLinkClasses}
                                    onClick={() => setNav(false)}
                                >
                                    {item.text}
                                </NavLink>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
