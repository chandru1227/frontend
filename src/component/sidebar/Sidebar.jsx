import React from 'react';
import { Outlet } from "react-router-dom";
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
// import Navbar from '../pages/Navbar';

const Sidebar = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="bg-[rgb(95,57,151)] w-64 p-6 text-white font-poppins shadow-lg flex flex-col justify-between">
                <ul className="space-y-6">


                    <li>
                        <a href="#" className="flex items-center p-3 hover:bg-[rgb(64,36,106)] rounded-lg transition-all duration-200">
                            <span className="font-bold">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/das" className="flex items-center p-3 hover:bg-[rgb(64,36,106)] rounded-lg transition-all duration-200">
                            <FaTwitter className="mr-3" size={20} />
                            <span>Twitter</span>
                        </a>
                    </li>
                    <li>
                        <a href="/das/youtube" className="flex items-center p-3 hover:bg-[rgb(64,36,106)] rounded-lg transition-all duration-200">
                            <FaYoutube className="mr-3" size={20} />
                            <span>YouTube</span>
                        </a>
                    </li>
                    <div className='mt-72'>
                        <li className="mt-auto">
                            <a href="/" className="flex items-center p-3 hover:bg-[rgb(64,36,106)] rounded-lg transition-all duration-200">
                                <span className="font-bold text-lg">Logout</span>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                                    alt="User Profile"
                                    className=" ml-3 w-6 h-6 rounded-full border-2 border-white shadow-lg"
                                />
                            </a>
                        </li>
                    </div>

                </ul>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Sidebar;
