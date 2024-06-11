import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
const Register = () => {
const navigate=useNavigate();
  //states
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      await axios.post('/api/v1/auth/register',{username,email,password})
      toast.success("user register successfully");
      //after successfull registration it will go to login.for it we use login
      navigate('/login')

    } catch (err) {
      console.log(error)
      if(err.response.data.error){
        setError(err.response.data.error)

      }
      else if(err.message){
        setError(err.message);
      }
      // pop up remove after 5sec
      setTimeout(()=>{
        setError('');
      },5000);
    }
  };
  return (
    <div className={`p-8 m-8  bg-gray-100 rounded shadow-lg mx-auto`}>
      {error && (
        <div className="mb-4">
          <div className="bg-red-500 text-white p-2 rounded">
            {error}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3 className="text-3xl mb-4">Sign Up</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Please Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register