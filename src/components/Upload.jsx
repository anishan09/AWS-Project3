import React from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadDocument = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const res = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        message.success('Appointment document uploaded successfully');
        navigate('/');
      } else {
        message.error('Failed to upload document');
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to upload document');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 sm:py-16 md:py-24">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Upload Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="documentType" className="block text-gray-700 dark:text-gray-300 mb-2">Document Type</label>
            <select
              id="documentType"
              name="documentType"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
              required
            >
              <option value="">Select document type</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Driver License">Driver License</option>
              <option value="Insurance">Insurance</option>
            </select>
          </div>
          <div>
            <label htmlFor="document" className="block text-gray-700 dark:text-gray-300 mb-2">Upload Document</label>
            <input
              type="file"
              id="document"
              name="document"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Upload Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
