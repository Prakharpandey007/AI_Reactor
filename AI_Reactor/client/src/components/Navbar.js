import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  //convert authtoken into json
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
    <div className="w-full bg-gray-400 p-4 shadow-md mb-4 text-center">
      <h1 className="text-primary font-bold text-3xl">AI-Reactor</h1>
      {/* //if logged in then Go to home and logout option otherwise not logged in go to signup and signin */}
      {loggedIn ? (
        <div className="space-x-4">
          <NavLink to="/" className="p-1 text-blue-600">
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} className="p-1 text-blue-600">
            Logout
          </NavLink>
        </div>
      ) : (
        <div className="space-x-4">
          <NavLink to="/register" className="p-1 text-blue-600">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="p-1 text-blue-600">
            Sign In
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
