import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

export default function Card() {
  const [data, setData] = useState([]); // Cards data
  const [categories, setCategories] = useState([]); // Categories data
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category ID
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering cards

  // Fetch all cards (optionally filtered by category)
  const fetchCards = async (categoryID = "") => {
    try {
      const url = categoryID
        ? `http://localhost:3000/cards/get-cards?categoryID=${categoryID}`
        : "http://localhost:3000/cards/get-cards";
      const response = await axios.get(url);

      // Sort the data in descending order before updating the state
      const sortedData = response.data.sort((a, b) => b.id - a.id);
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  // Fetch categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/categories/categories"
      );
      setCategories(response.data); // Populate categories from API
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch cards and categories on component mount
  useEffect(() => {
    fetchCards(); // Fetch all cards initially
    getAllCategories(); // Fetch all categories
  }, []);

  // Handle category selection
  const handleCategoryChange = (categoryID) => {
    setSelectedCategory(categoryID);
    fetchCards(categoryID); // Fetch cards based on selected category
  };

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchTerm(query);

    // Filter data based on the search query
    const filteredData = data.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div>
      {/* Pass categories, selection handler, and search handler to Header */}
      <Header
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch} // Pass onSearch to Header
      />

      <div className="flex flex-wrap p-3 gap-8 justify-center">
        {data.length === 0 ? (
          <p>No cards available.</p> // Show message if no cards
        ) : (
          data.map((product) => (
            <div
              key={product.id}
              className="w-[280px] h-[450px] bg-slate-500 rounded-md p-4 shadow-lg shadow-black flex flex-col items-center text-center"
            >
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.title}
                className="h-48 w-auto mb-4 object-contain"
              />
              <div className="text-white flex-grow">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-lg font-bold mb-2">${product.price}</p>
              </div>
              <div className="mt-auto">
                <Link to={`/product/${product.id}`}>
                  <button className="flex items-center justify-center h-[7vh] w-[27vw] sm:w-[28vw] md:w-[15vw] lg:w-[15vw] rounded-md hover:border-2 border-white bg-blue-700 text-white hover:bg-blue-900 active:bg-green-900 active:text-black active:border-black hover:scale-105 duration-150 cursor-pointer">
                    View more
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
