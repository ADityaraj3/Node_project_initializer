import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-darker pt-12 pb-6 border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">I</div>
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                INITIALIZE
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-4">
                            A modern toolkit to initialize your projects with ease.
                            Customize your project structure and dependencies in minutes.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Frameworks</h3>
                        <ul className="space-y-2">
                            <li><Link to="/vite" className="text-gray-400 hover:text-primary transition-colors">Vite</Link></li>
                            <li><Link to="/nest" className="text-gray-400 hover:text-primary transition-colors">Nest.js</Link></li>
                            <li><Link to="/next" className="text-gray-400 hover:text-primary transition-colors">Next.js</Link></li>
                            <li><Link to="/express" className="text-gray-400 hover:text-primary transition-colors">Express</Link></li>
                            <li><Link to="/angular" className="text-gray-400 hover:text-primary transition-colors">Angular</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6 mt-8 text-center">
                    <p className="text-gray-500">
                        © {new Date().getFullYear()} Initialize. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
