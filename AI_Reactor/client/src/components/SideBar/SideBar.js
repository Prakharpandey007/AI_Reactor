import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';

const SideBar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 p-6">
      <div className="flex flex-col items-start">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className="w-5 cursor-pointer mb-6" 
          src={assets.menu_icon} 
          alt="Menu Icon" 
        />
        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-full cursor-pointer mb-6">
          <img src={assets.plus_icon} alt="Plus Icon" className="w-5" />
          {extended && <p className="text-gray-600">New Chat</p>}
        </div>
        {extended && (
          <div>
            <p className="text-gray-600 mb-4">Recent</p>
            <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-full cursor-pointer mb-4">
              <img src={assets.message_icon} alt="Message Icon" className="w-5" />
              <p className="text-gray-600">What is react</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-full cursor-pointer mb-4">
          <img src={assets.question_icon} alt="Question Icon" className="w-5" />
          {extended && <p className="text-gray-600">Help</p>}
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-full cursor-pointer mb-4">
          <img src={assets.history_icon} alt="History Icon" className="w-5" />
          {extended && <p className="text-gray-600">Activity</p>}
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-full cursor-pointer">
          <img src={assets.setting_icon} alt="Settings Icon" className="w-5" />
          {extended && <p className="text-gray-600">Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
