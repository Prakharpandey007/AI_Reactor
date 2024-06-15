import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  //states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      await axios.post('/api/v1/auth/register', { username, email, password });
     
      toast.success("User registered successfully");
     
      //after successful registration it will go to login
      navigate('/login');
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      // pop up remove after 5 sec
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        {error && (
          <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-center">Sign Up</h3>
          <div className="mt-4">
            <label className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Please Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
