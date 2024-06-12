

import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from '../assets/assets.js';

const Navbar = () => {
  const navigate = useNavigate();
  // Assume authToken is a boolean for simplicity
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logout successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-red-200 p-2 shadow-md flex items-center justify-between ">
      <h1 className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent font-3xl ">AI-Reactor</h1>
      <div className="flex items-center space-x-4">
        {/* Navigation Links */}
        {loggedIn ? (
          <>
            <NavLink to="/" className="p-1 text-blue-600">
              Home
            </NavLink>
            <NavLink to="/login" onClick={handleLogout} className="p-1 text-blue-600">
              Logout
            </NavLink>
            {/* User Icon */}
            <img src={assets.user_icon} alt="User Icon" className="w-10 h-10 rounded-full" />
          </>
        ) : (
          <>
            <NavLink to="/register" className="p-1 text-blue-600">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="p-1 text-blue-600">
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
