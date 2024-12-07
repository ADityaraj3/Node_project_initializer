import React, { useState } from 'react';

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
        const mailtoLink = `mailto:adityasraj123@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;
    };

    return (
        <div className='bg-[#1e1e1e] pt-[50px] justify-center text-white min-h-screen px-4 sm:px-6 lg:px-8'>
            <h1 className='text-center text-2xl sm:text-5xl font-extrabold font-serif'>
                Contact Us
            </h1>
            <p className="text-center pt-[20px] text-lg">
                Have questions or feedback? We'd love to hear from you! Reach out to us using the form below.
            </p>
            <div className="mt-10 flex justify-center">
                <form
                    className="w-full max-w-lg bg-[#252525] p-6 rounded-lg shadow-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full px-4 py-2 bg-[#333] text-white rounded focus:outline-none focus:ring focus:ring-[#00df9a]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full px-4 py-2 bg-[#333] text-white rounded focus:outline-none focus:ring focus:ring-[#00df9a]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-bold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Your Message"
                            className="w-full px-4 py-2 bg-[#333] text-white rounded focus:outline-none focus:ring focus:ring-[#00df9a]"
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#00df9a] text-black font-bold py-2 px-4 rounded hover:bg-[#00c87a] focus:outline-none focus:ring focus:ring-[#00df9a]"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
            <div className="text-center mt-10">
                <p className="text-sm text-gray-400">
                    You can also reach us at{' '}
                    <a
                        href="mailto:adityasraj123@gmail.com"
                        className="text-[#00df9a] hover:underline"
                    >
                        adityasraj123@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ContactUsPage;
