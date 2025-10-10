import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Sample data for news articles
const newsArticles = [
  {
    id: 1,
    title: "New Advances in Cancer Treatment",
    description: "Discover the latest advancements in cancer treatment and research.",
    content: "Here is the full content of the article about advances in cancer treatment...",
    image: "https://via.placeholder.com/300x200" // Replace with actual image URL
  },
  {
    id: 2,
    title: "Breakthrough in Heart Disease Prevention",
    description: "Learn about new strategies for preventing heart disease and maintaining heart health.",
    content: "Here is the full content of the article about heart disease prevention...",
    image: "https://via.placeholder.com/300x200" // Replace with actual image URL
  },
  {
    id: 3,
    title: "Innovations in Diabetes Management",
    description: "Explore innovative approaches to managing diabetes and improving patient outcomes.",
    content: "Here is the full content of the article about diabetes management...",
    image: "https://via.placeholder.com/300x200" // Replace with actual image URL
  },
  // Add more articles as needed
];

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsArticles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 lg:px-36">
      <button onClick={() => navigate(-1)} className="text-blue-500 dark:text-blue-400 mb-4 hover:text-blue-700 dark:hover:text-blue-300">
        &larr; Back to News
      </button>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{article.title}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{article.content}</p>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
