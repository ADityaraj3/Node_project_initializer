import React from 'react';
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
      description: 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects ',
      image: '/public/vite-logo.svg',
      alt: 'Vite Logo',
      services: [
        {
          icon: <FaReact />,
          name: 'React'
        },
        {
          icon: <SiJavascript />,
          name: 'Vanilla Javascript'
        },
        {
          icon: <RiSvelteLine/>,
          name: 'Svelte'
        },
        {
          icon: <FaVuejs />,
          name: 'Vue'
        },
        {
          icon: <SiPreact />,
          name: 'Preact'
        },
        {
          icon: <SiLit />,
          name: 'Lit'
        },
        {
          icon: <SiQwik />,
          name: 'Qwik'
        },
        {
          icon: <SiSolid />,
          name: 'Solid'
        }
      ]
    },
    {
      name: 'NestJs',
      link: '/nest',
      description: 'Nest is a framework that provides a set of tools and utilities to help you build scalable and maintainable server-side applications.',
      image: '/public/nest-logo.svg',
      alt: 'Nest Logo',
      services: [
        {
          icon: <SiNestjs />,
          name: 'NestJs'
        },
      ]
    },
    {
      name: 'NextJs',
      link: '/next',
      description: 'Next is a framework that provides a set of tools and utilities to help you build scalable and maintainable server-side applications.',
      image: '/public/nextjs-logo.svg',
      alt: 'Next Logo',
      services: [
        {
          icon: <RiNextjsFill />,
          name: 'NextJs'
        },
      ]
    },
    {
      name: 'Express',
      link: '/express',
      description: 'Express is a framework that provides a set of tools and utilities to help you build scalable and maintainable server-side applications.',
      image: '/public/express-logo.svg',
      alt: 'Express Logo',
      services: [
        {
          icon: <SiExpress />,
          name: 'Express'
        },
      ]
    },
    {
      name: 'Angular',
      link: '/angular',
      description: 'Angular is a framework that provides a set of tools and utilities to help you build scalable and maintainable server-side applications.',
      image: '/public/angular-logo.svg',
      alt: 'Angular Logo',
      services: [
        {
          icon: <SiAngular />,
          name: 'Angular'
        },
      ]
    }
  ]

  return (
    <div className='bg-[#1e1e1e] pt-[50px] justify-center text-white min-h-screen px-4 sm:px-6 lg:px-8'>
      <h1 className='text-center text-2xl sm:text-5xl font-extrabold font-serif'>
        Initialize your projects with ease
      </h1>
      <p className="text-center pt-[50px] text-lg">
        Use this platform to get the zip file for your project with all the dependencies pre-installed
        <span className="block">and with your customized folder structure.</span>
      </p>
      
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {
          frameWorks.map((frameWork, index) => (
            <CustomCard key={index} frameWork={frameWork} />
          ))
        }

      </div>
    </div>
  );
}

export default HomePage;
