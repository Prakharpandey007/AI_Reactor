// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   // states
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   //register ctrl
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/v1/auth/login", { email, password });
//       //toast for popup 
//       toast.success("Login Successfully");
//       //save token into local storage
//       localStorage.setItem("authToken", true);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       if (err.response?.data?.error) {
//         setError(err.response.data.error);
//       } else if (err.message) {
//         setError(err.message);
//       }
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
//         {error && (
//           <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <h3 className="text-2xl font-semibold text-center">Sign In</h3>
//           <div className="mt-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               required
//               className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mt-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               required
//               className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
//           >
//             Sign In
//           </button>
//           <p className="mt-4 text-center">
//             Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Please Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //login ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/login", { email, password });
      const { token, username } = response.data; // Assuming response includes token and username
      toast.success("Login Successfully");
      // Save token and username into local storage
      localStorage.setItem("authToken", JSON.stringify(token));
      localStorage.setItem("username", username);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
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
          <h3 className="text-2xl font-semibold text-center">Sign In</h3>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
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
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Please Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
