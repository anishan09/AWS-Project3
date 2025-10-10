import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 lg:px-36">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Links Section */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          
          {/* Social Media Icons */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebookF size={24} /></a>
              <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram size={24} /></a>
              <a href="#" className="text-blue-800 hover:text-blue-900"><FaLinkedinIn size={24} /></a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="flex items-center"><FaEnvelope className="mr-2" />info@example.com</p>
            <p>+123 456 7890</p>
          </div>

          {/* Newsletter Section */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter to stay updated with the latest news and offers.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 mb-4 sm:mb-0 sm:mr-2 rounded-md text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
