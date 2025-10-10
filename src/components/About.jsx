import React from "react";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { author2,author1,author3 } from "../assets";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-6 lg:px-36">
      {/* Company Overview */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-center">
          We are a dedicated healthcare provider committed to offering exceptional medical services to our community. With a focus on quality, compassion, and innovation, our team strives to improve the health and well-being of every patient we serve.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
          <p className="text-lg">
            <strong>Mission:</strong> To deliver high-quality healthcare with a personal touch, ensuring every patient receives the best care possible.
          </p>
          <p className="text-lg mt-4">
            <strong>Vision:</strong> To be the leading healthcare provider recognized for our commitment to excellence, innovation, and compassionate care.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Team Member 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-80 text-center">
            <img src={author1} alt="Team Member 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold">Dr. Jane Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">Chief Medical Officer</p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-80 text-center">
            <img src={author2} alt="Team Member 2" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold">Dr. John Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">Senior Surgeon</p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-80 text-center">
            <img src={author3} alt="Team Member 3" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold">Dr. Emily Johnson</h3>
            <p className="text-gray-600 dark:text-gray-400">Pediatric Specialist</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-blue-500 mr-3" size={20} />
            <p>123 Hospital St., Health City, HC 12345</p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-blue-500 mr-3" size={20} />
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 mr-3" size={20} />
            <p>info@company.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
