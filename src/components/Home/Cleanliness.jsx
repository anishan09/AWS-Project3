import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import Swiper's Autoplay styles
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { sliderimg1, sliderimg2, sliderimg3, sliderimg4, sliderimg5 } from "../../assets";
import { textVariant } from "../../utils/motion";
import { motion } from "framer-motion";
const imageSlides = [
  sliderimg1,
  sliderimg2,
  sliderimg3,
  sliderimg4,
  sliderimg5
];

const Cleanliness = () => {
  return (
    <section className="bg-white dark:bg-inherit py-16 px-6 lg:px-36">
       <motion.div
                variants={textVariant(0.3)} // Adjust delay if needed
                initial="hidden"
                animate="show"
                 className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
          We Maintain Cleanliness Rules Inside Our Hospital
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Discover how we ensure a clean and safe environment for our patients and staff.
        </p>
      </motion.div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {imageSlides.map((img, index) => (
          <SwiperSlide key={index} className="bg-white dark:bg-inherit flex">
            <img src={img} alt={`Cleanliness slide ${index + 1}`} className="rounded-xl" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Cleanliness;
