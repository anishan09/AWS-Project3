import React from "react";
import { HeroImage } from "../../assets"; // Replace with your actual image path
import { motion } from "framer-motion";
import { textVariant, zoomIn } from "../../utils/motion";

const Hero = () => {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-36 py-16 dark:bg-gray-900 dark:text-white">
            {/* Left Section - Text and Buttons */}
            <motion.div
                variants={textVariant(0.3)} // Adjust delay if needed
                initial="hidden"
                animate="show"
                className="flex-1 mb-8 lg:mb-0 lg:mr-8"
            >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-extrabold dark:text-gray-300">
                    We Provide You <span className="text-blue-500">Service</span> That You Can <span className="text-blue-500">Trust!</span>
                </h1>
                <p className="text-base lg:text-lg mb-6 font-light dark:text-gray-400">
                    Your health and wellbeing are our top priorities. Discover our comprehensive services and experience quality care.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="/bookapt" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                        Get Appointment
                    </a>
                    <a href="/about" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        About Us
                    </a>
                </div>
            </motion.div>

            {/* Right Section - Hero Image */}
            <motion.div
                variants={zoomIn(0.3)} // Adjust parameters if needed
                initial="hidden"
                animate="show"
                className="flex-1 pt-8 lg:pt-7"
            >
                <img src={HeroImage} alt="Hero" className="w-full h-auto object-cover" />
            </motion.div>
        </section>
    );
}

export default Hero;
