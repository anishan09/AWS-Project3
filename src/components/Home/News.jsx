import React from "react";
import { Link } from "react-router-dom";
import { news1, news2, news3 } from "../../assets";

// Sample data for news articles
const newsArticles = [
  {
    id: 1,
    title: "New Advances in Cancer Treatment",
    description: "Discover the latest advancements in cancer treatment and research.",
    image: news1// Replace with actual image URL
  },
  {
    id: 2,
    title: "Breakthrough in Heart Disease Prevention",
    description: "Learn about new strategies for preventing heart disease and maintaining heart health.",
    image: news2 // Replace with actual image URL
  },
  {
    id: 3,
    title: "Innovations in Diabetes Management",
    description: "Explore innovative approaches to managing diabetes and improving patient outcomes.",
    image: news3 // Replace with actual image URL
  },
  // Add more articles as needed
];

const News = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 lg:px-36">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
          Latest Medical Blogs
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Stay updated with the latest developments in medical science and healthcare.
        </p>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden w-full sm:w-80">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{article.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{article.description}</p>
              <Link to={`/news/${article.id}`} className="mt-4 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
