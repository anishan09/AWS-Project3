import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerimage } from '../assets'; // Replace with your actual image path
import { message } from 'antd';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        name,
        email,
        phone,
        password,
        city
      };
    
      const response = await axios.post("http://localhost:3001/register", {formData});
      console.log(response);
      if (response.data === 201) {
        navigate("/login");
        message.success("Registration Succesfull \n Please Login")
      } else {
        console.log("Unexpected status code:", response.data);
        navigate("/register");
      }
    } catch (err) {
      console.error("Error:", err);
      navigate("/register");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-28 pb-28 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex max-w-4xl w-full">
        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Register</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
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
              <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 dark:text-gray-300 mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="Enter your city"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center">
            <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">Already have an account? Login</Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden sm:block w-1/2">
          <img src={registerimage} alt="Register" className="object-cover w-full h-full rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
