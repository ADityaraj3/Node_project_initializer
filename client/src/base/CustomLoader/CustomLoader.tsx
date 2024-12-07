import React, { useState, useEffect } from 'react';
import './CustomLoader.css';

const CustomLoader: React.FC = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [showQuote, setShowQuote] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 5000);
    
        const timer2 = setTimeout(() => {
            setShowQuote(true);
        }, 12000);
    
        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="loader"></div>
                {showMessage && <p className="text-white mt-6">Only a few seconds more.</p>}
                {showQuote && <p className="text-white mt-6 font-mono">“Patience is bitter, but its fruit is sweet.” ― Aristotle</p>}
            </div>
        </div>
    );
};

export default CustomLoader;
