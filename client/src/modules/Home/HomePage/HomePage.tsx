import React from 'react';
import { motion } from 'framer-motion';
import CustomCard from '../../../base/CustomCard/CustomCard';
import { FaReact } from 'react-icons/fa';
import { SiJavascript, SiLit, SiPreact, SiQwik, SiNestjs, SiExpress, SiAngular } from "react-icons/si";
import { RiSvelteLine, RiNextjsFill } from "react-icons/ri";
import { FaVuejs } from "react-icons/fa6";
import { SiSolid } from "react-icons/si";

const HomePage: React.FC = () => {
  const frameWorks = [
    {
      name: 'Vite',
      link: 'vite',
      description: 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.',
      image: '/vite-logo.svg',
      alt: 'Vite Logo',
      services: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiJavascript />, name: 'Vanilla Javascript' },
        { icon: <RiSvelteLine/>, name: 'Svelte' },
        { icon: <FaVuejs />, name: 'Vue' },
        { icon: <SiPreact />, name: 'Preact' },
        { icon: <SiLit />, name: 'Lit' },
        { icon: <SiQwik />, name: 'Qwik' },
        { icon: <SiSolid />, name: 'Solid' }
      ]
    },
    {
      name: 'NestJs',
      link: '/nest',
      description: 'Nest is a framework that provides a set of tools and utilities to help you build scalable and maintainable server-side applications.',
      image: '/nest-logo.svg',
      alt: 'Nest Logo',
      services: [
        { icon: <SiNestjs />, name: 'NestJs' },
      ]
    },
    {
      name: 'NextJs',
      link: '/next',
      description: 'Next.js is a React framework that enables server-side rendering and generating static websites for React based web applications.',
      image: '/nextjs-logo.svg',
      alt: 'Next Logo',
      services: [
        { icon: <RiNextjsFill />, name: 'NextJs' },
      ]
    },
    {
      name: 'Express',
      link: '/express',
      description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web applications.',
      image: '/express-logo.svg',
      alt: 'Express Logo',
      services: [
        { icon: <SiExpress />, name: 'Express' },
      ]
    },
    {
      name: 'Angular',
      link: '/angular',
      description: 'Angular is a platform for building mobile and desktop web applications using TypeScript/JavaScript and other languages.',
      image: '/angular-logo.svg',
      alt: 'Angular Logo',
      services: [
        { icon: <SiAngular />, name: 'Angular' },
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className='bg-dark min-h-screen pt-20 px-4 sm:px-6 lg:px-8'>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Initialize your projects with ease
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started quickly with customizable project templates. Download a ZIP file with your
            preferred directory structure and pre-installed dependencies.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {frameWorks.map((frameWork, index) => (
            <motion.div key={index} variants={item}>
              <CustomCard frameWork={frameWork} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Why Choose Initialize?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="bg-card-bg p-6 rounded-xl">
              <div className="bg-primary/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Setup</h3>
              <p className="text-gray-400">Skip the repetitive initialization process and get your project ready in seconds.</p>
            </div>
            <div className="bg-card-bg p-6 rounded-xl">
              <div className="bg-secondary/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customizable</h3>
              <p className="text-gray-400">Fine-tune your project structure and dependencies to match your exact requirements.</p>
            </div>
            <div className="bg-card-bg p-6 rounded-xl">
              <div className="bg-primary/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
              <p className="text-gray-400">All templates follow industry best practices and coding standards.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
