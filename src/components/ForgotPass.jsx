import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-28 pb-28 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Forgot Password</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 flex justify-between items-center">
          <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
