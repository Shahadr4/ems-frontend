import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext/authContext';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  const {login} = useAuth(); // Use the login function from auth context
  const  navigate = useNavigate(); // Use navigate for redirection
  // Auto-close error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post('https://employee-frontend-it9y.vercel.app/api/auth/login', { email, password });
      if (response.data.success) {
        login(response.data.user) // Set user data in context
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        }else{
          navigate('/employee-dashboard'); // Redirect to home or another page
        }

        // You can redirect or store token here
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        // If error is an object, convert to string
        const errMsg = typeof error.response.data.error === "string"
          ? error.response.data.error
          : JSON.stringify(error.response.data.error);
        
        setError(errMsg);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen flex">
      {/* Popup Alert in Top-Left */}
      {error && (
        <div className="fixed top-6 left-6 z-50">
          <div className="bg-white/30 backdrop-blur-md border border-pink-300 shadow-xl rounded-xl p-4 flex items-center space-x-3 animate-fade-in">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
            </svg>
            <div className="text-red-700 font-semibold">{error}</div>
            
          </div>
        </div>
      )}

      {/* Left Side: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-6">EMAIL ID</h2>
          <input
            type="text"
            placeholder="Enter email ID"
            className="w-full p-3 mb-4 bg-gray-300 rounded"
            onChange={(e) => setemail(e.target.value)}
          />
          <h2 className="text-2xl font-semibold mb-6">PASSWORD</h2>
          <input
            type="password"
            placeholder="********"
            className="w-full p-3 mb-4 bg-gray-300 rounded"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <button
            className="bg-[#2d252d] text-white px-6 py-2 rounded hover:bg-[#1f1a1f]"
          >
            Login
          </button>
          <div className="mt-6 text-xs text-gray-700">
            <a href="#" className="text-blue-600 underline">forget Password?</a><br />
            <p>If you are not user you are not welcome.</p>
            &nbsp;
            <p>For admin login use:</p>
            
            <p>admin= admin@gmail.com</p>
            <p>password=admin</p>
          </div>
        </form>
      </div>

      {/* Right Side: Title */}
      <div className="hidden md:flex w-1/2 bg-[#2d252d] text-white justify-center items-center">
        <h1 className="text-3xl text-center leading-snug">
          Employee<br />Management System
        </h1>
        
      </div>
      
    </div>
  );
}

export default Login;