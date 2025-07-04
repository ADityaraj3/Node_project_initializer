import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomCardProps } from '../../utlis/Interfaces/Interface';
import { HiArrowRight } from 'react-icons/hi';

const CustomCard: React.FC<CustomCardProps> = ({ frameWork }) => {
    const navigate = useNavigate();

    return (
        <motion.div 
            whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            className="bg-card-bg rounded-xl overflow-hidden border border-gray-800 h-full flex flex-col"
        >
            <div className="p-4 flex items-center justify-center bg-darker">
                <img 
                    src={frameWork.image} 
                    alt={frameWork.alt} 
                    className="h-24 object-contain" 
                />
            </div>
            
            <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-white">{frameWork.name}</h3>
                <p className="text-gray-400 mb-4">{frameWork.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                    {frameWork.services.map((service, index) => (
                        <div 
                            key={index} 
                            className="flex items-center gap-1 bg-darker px-3 py-1.5 rounded-full text-sm"
                            title={service.name}
                        >
                            <span className="text-primary">{service.icon}</span>
                            <span className="text-gray-300">{service.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-6 border-t border-gray-800">
                <button
                    onClick={() => navigate(frameWork.link)}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                    <span>Start Building</span>
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default CustomCard;
