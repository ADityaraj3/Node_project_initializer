import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaComment } from 'react-icons/fa';

const ContactUsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' }); 
    };

    const validate = () => {
        const newErrors: typeof errors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
            isValid = false;
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message cannot be empty.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const { name, message } = formData;

        const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
        const body = encodeURIComponent(`${message}`);
        const mailtoLink = `mailto:initializejsprojects@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="bg-dark min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className="text-3xl md:text-5xl font-bold text-center mb-6"
                    variants={itemVariants}
                >
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Get In Touch
                    </span>
                </motion.h1>
                
                <motion.p 
                    className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto"
                    variants={itemVariants}
                >
                    Have questions or feedback? We'd love to hear from you! Reach out to us using the form below.
                </motion.p>
                
                <motion.div 
                    className="bg-card-bg rounded-xl p-8 shadow-xl border border-gray-800"
                    variants={itemVariants}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="flex items-center gap-2 text-gray-300 mb-2">
                                <FaUser className="text-primary" />
                                <span>Your Name</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`input ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="flex items-center gap-2 text-gray-300 mb-2">
                                <FaEnvelope className="text-primary" />
                                <span>Email Address</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`input ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="flex items-center gap-2 text-gray-300 mb-2">
                                <FaComment className="text-primary" />
                                <span>Your Message</span>
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="How can we help you?"
                                className={`input resize-none ${errors.message ? 'border-red-500' : ''}`}
                            ></textarea>
                            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                        </div>
                        
                        <div className="text-center pt-4">
                            <motion.button
                                type="submit"
                                className="btn btn-primary px-8 py-3"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
                
                <motion.div 
                    className="text-center mt-12"
                    variants={itemVariants}
                >
                    <p className="text-gray-400">
                        You can also reach us directly at{' '}
                        <a
                            href="mailto:initializejsprojects@gmail.com"
                            className="text-primary hover:underline"
                        >
                            initializejsprojects@gmail.com
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContactUsPage;
