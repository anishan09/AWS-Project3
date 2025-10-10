import React from "react";
import { FaAmbulance, FaCapsules, FaHeartbeat } from "react-icons/fa";
import { motion } from "framer-motion";
import { textVariant } from "../../utils/motion";
const services = [
    {
        id: 1,
        title: "Emergency Help",
        icon: <FaAmbulance className="w-12 h-12 text-blue-500" />,
    },
    {
        id: 2,
        title: "Enriched Pharmacy",
        icon: <FaCapsules className="w-12 h-12 text-blue-500" />,
    },
    {
        id: 3,
        title: "Medical Health",
        icon: <FaHeartbeat className="w-12 h-12 text-blue-500" />,
    },
];

const Service = () => {
    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 lg:px-36">
               {/* Left Section - Text and Buttons */}
               <motion.div
                variants={textVariant(0.3)} // Adjust delay if needed
                initial="hidden"
                animate="show"
                
             className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
                    We Are Always Ready to Help You & Your Family
                </h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-8">
                {services.map(service => (
                    <div key={service.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full sm:w-64 flex flex-col items-center text-center">
                        {service.icon}
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">{service.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;
