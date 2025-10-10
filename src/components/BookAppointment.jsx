import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Radio } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { appointment } from '../assets';

const BookAppointment = () => {
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const cookie = Cookies.get("_id");
      console.log(cookie);
      const res = await axios.post('http://localhost:3001/auth',{cookie}, {
        withCredentials: true,
      });
         console.log(res);
      if (res.data.message === 'Error' || res.data.message === undefined) {
        message.warning('Please login to book Appointment');
        navigate('/Login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    emergencyContact: '',
    address: '',
    occupation: '',
    appointmentDate: '',
    reason: '',
    insurancePolicy: '',
    bloodGroup: '',
    medicalHistory: '',
    currentMedication: '',
    documentUpload: null,
    documentType: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });
    
    try {
      const cookie = Cookies.get("_id");
      const res = await axios.post('http://localhost:3001/bookapt', formData, {
        withCredentials: true
      });
      console.log(res);
      if (res.data.message === 'Appointment booked successfully!') {
        message.success(res.data.message);
        navigate("/upload");
      } else {
        message.error('Failed to book appointment');
        navigate("/bookapt")
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to book appointment');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8 sm:py-16 md:py-24">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row max-w-6xl w-full">
        <div className="w-full p-4 sm:p-8 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Book an Appointment</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
           encType='multipart/form-data'
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Personal Info</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name of Patient</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter patient's name"
                  value={formData.name}
                  onChange={handleChange}
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
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                <Radio.Group name="gender" id="gender" value={formData.gender} onChange={handleChange} className="w-full">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </div>
              <div>
                <label htmlFor="emergencyContact" className="block text-gray-700 dark:text-gray-300 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  placeholder="Enter emergency contact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="occupation" className="block text-gray-700 dark:text-gray-300 mb-2">Occupation</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  placeholder="Enter occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Medical Info</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="appointmentDate" className="block text-gray-700 dark:text-gray-300 mb-2">Appointment Date</label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="reason" className="block text-gray-700 dark:text-gray-300 mb-2">Reason for Appointment</label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  placeholder="Enter reason for appointment"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="insurancePolicy" className="block text-gray-700 dark:text-gray-300 mb-2">Insurance Policy</label>
                <input
                  type="text"
                  id="insurancePolicy"
                  name="insurancePolicy"
                  placeholder="Enter insurance policy"
                  value={formData.insurancePolicy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="bloodGroup" className="block text-gray-700 dark:text-gray-300 mb-2">Blood Group</label>
                <input
                  type="text"
                  id="bloodGroup"
                  name="bloodGroup"
                  placeholder="Enter blood group"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="medicalHistory" className="block text-gray-700 dark:text-gray-300 mb-2">Medical History</label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  placeholder="Enter medical history"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="currentMedication" className="block text-gray-700 dark:text-gray-300 mb-2">Current Medication</label>
                <textarea
                  id="currentMedication"
                  name="currentMedication"
                  placeholder="Enter current medication"
                  value={formData.currentMedication}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Procced
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/3">
          <img src={appointment} alt="Appointment" className="object-cover h-full w-full rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
