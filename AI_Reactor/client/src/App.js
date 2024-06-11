import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast';
// react-hot-toast for push notification 
function App() {
  return (
    <>
   
      <Navbar />
      <Toaster/>
      <Routes>
        <Route path="/" 
        element={<HomePage />} />
      
      <Route path="/register"
        element={<Register/>} />
        <Route path="/login"
        element={<Login/>} />

</Routes>
      
    </>
  );
}

export default App;
