import React from 'react';
import Sidebar from '../components/SideBar/SideBar.js';
import { assets } from '../assets/assets.js';

const HomePage = () => {
  const isLoggedIn = localStorage.getItem('authToken');

  return (
    <div className="flex">
      {isLoggedIn && <Sidebar />}
      <div className={`${isLoggedIn ? 'ml-64' : ''} flex-1 min-h-screen pb-40 relative`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between text-2xl py-5 text-gray-600">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" className="w-10 rounded-full" />
          </div>
          <div className="my-12 text-5xl text-gray-400 font-medium px-5">
            <p><span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">Hello, Dev</span></p>
            <p>How can I help you today?</p>
          </div>
          <div className="flex justify-center px-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              <div className="h-52 p-5 bg-gray-100 relative cursor-pointer hover:bg-gray-200">
                <p className="text-gray-600 text-lg">Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" className="w-9 p-1 bg-white rounded-full absolute bottom-3 right-3" />
              </div>
              <div className="h-52 p-5 bg-gray-100 relative cursor-pointer hover:bg-gray-200">
                <p className="text-gray-600 text-lg">How to impress a Girl</p>
                <img src={assets.bulb_icon} alt="" className="w-9 p-1 bg-white rounded-full absolute bottom-3 right-3" />
              </div>
              <div className="h-52 p-5 bg-gray-100 relative cursor-pointer hover:bg-gray-200">
                <p className="text-gray-600 text-lg">Suggest Good project Using Mern Stack</p>
                <img src={assets.message_icon} alt="" className="w-9 p-1 bg-white rounded-full absolute bottom-3 right-3" />
              </div>
              <div className="h-52 p-5 bg-gray-100 relative cursor-pointer hover:bg-gray-200">
                <p className="text-gray-600 text-lg">How to take revenge from our Ex</p>
                <img src={assets.code_icon} alt="" className="w-9 p-1 bg-white rounded-full absolute bottom-3 right-3" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full max-w-5xl px-4 mx-auto">
          <div className="flex items-center justify-between gap-5 bg-gray-100 p-3 rounded-full">
            <input type="text" placeholder="Enter a prompt here" className="flex-1 bg-transparent border-none outline-none p-2 text-lg" />
            <div className="flex items-center gap-4">
              <img src={assets.gallery_icon} alt="" className="w-6 cursor-pointer" />
              <img src={assets.mic_icon} alt="" className="w-6 cursor-pointer" />
              <img src={assets.send_icon} alt="" className="w-6 cursor-pointer" />
            </div>
          </div>
          <p className="text-center text-sm mt-4 text-gray-400 font-light">It may display some wrong info.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


