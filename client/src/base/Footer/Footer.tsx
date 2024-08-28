import React from 'react'

const Footer: React.FC = () => {
    return (
        <div>
            <footer className="bg-[#1e1e1e] shadow dark:bg-[#1e1e1e] pt-12">
                <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex flex-col items-center sm:items-start mb-6 sm:mb-0 space-y-3 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
                            <img src="/public/logo.png" className="w-10 h-10" alt="logo" />
                            <span className="text-2xl font-semibold whitespace-nowrap dark:text-[#00df9a]">INITIALIZE.</span>
                        </a>

                        <ul className="flex flex-col sm:flex-row items-center text-sm font-medium text-gray-500 mb-6 sm:mb-0 dark:text-gray-400">
                            <li className="mb-2 sm:mb-0 sm:mr-6">
                                <a href="#" className="hover:underline">About</a>
                            </li>
                            <li className="mb-2 sm:mb-0 sm:mr-6">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li className="mb-2 sm:mb-0 sm:mr-6">
                                <a href="#" className="hover:underline">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 dark:border-gray-700" />
                    <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
                        © 2024 <a href="#" className="hover:underline">Aditya™</a>. All Rights Reserved.
                    </span>
                </div>
            </footer>
        </div>

    )
}

export default Footer