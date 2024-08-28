import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomCardProps } from '../../utlis/Interfaces/Interface';


const CustomCard: React.FC<CustomCardProps> = ({ frameWork }) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-slate-300 bg-clip-border text-gray-700 shadow-lg">
                <div
                    className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                    <img
                        src={frameWork.image}
                        alt={frameWork.alt}
                    />
                    <div
                        className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            {frameWork.name}
                        </h5>
                    </div>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        {frameWork.description}
                    </p>

                    {/* Displaying the icons with tooltips */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        {frameWork.services.map((service, index) => (
                            <div key={index} className="text-2xl text-gray-700" title={service.name}>
                                {service.icon}
                            </div>
                        ))}
                    </div>

                </div>
                <div className="p-6 pt-3">
                    <button
                        className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => navigate(frameWork.link)}
                    >
                        Build
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomCard;
