import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { loginImage } from '../assets'; // Replace with your actual image path
import axios from 'axios';
import Cookies from 'js-cookie';
import { message } from 'antd';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    console.log(formData);

    try {
      const response = await axios.post("http://54.234.124.157:3001/login", {formData});
      console.log(response.data.token);
     if(response.data.isAdmin){
      message.success("Login succesfull")
      Cookies.set("_id", response.data.token);
      navigate("/admin");
     }
      if (response.data.code === 200) {
        message.success("Login succesfull")
        Cookies.set("_id", response.data.token);
        navigate("/");
      }
      else if(response.data=="Incorrect password"){
        message.error("Incorrect password");
      }
      else{
        message.error("User not found");
      }
    } catch (err) {
      console.log(err);
      message.error("Error in logging x")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex max-w-4xl w-full">
        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center">
            <Link to="/forgot-password" className="text-blue-500 dark:text-blue-400 hover:underline">Forgot Password?</Link>
            <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline">Don't have an account? Sign Up</Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden sm:block w-1/2">
          <img src={loginImage} alt="Login" className="object-cover w-full h-full rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
