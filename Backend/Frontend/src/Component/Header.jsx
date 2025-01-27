import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({ categories, onCategoryChange, onSearch }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle category change
  const handleCategoryChange = (e) => {
    const categoryID = e.target.value;
    setSelectedCategory(categoryID);
    if (onCategoryChange) {
      onCategoryChange(categoryID);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    // Pass the search query to the parent component via onSearch callback
    if (onSearch) {
      onSearch(query);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <div className="h-[11vh] w-auto bg-gray-800 text-white flex flex-row items-center justify-between p-2">
        <p className="mt-3 text-xl">Dashboard</p>

        {/* Search Bar */}
        <div className="flex flex-row p-2">
          <div className="relative flex items-center">
            <FaSearch className="absolute text-gray-400 left-3 h-5 w-5" />
            <input
              type="text"
              placeholder="Search here..."
              className="h-[5vh] w-[17vw] pl-10 rounded-sm text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange} // Handle input change for search
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="text-black border-none rounded-lg m-3 bg-blue-700">
          <select
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="h-[5vh] w-[15vw] text-black rounded-md px-2"
          >
            <option value="">All product</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-row">
          <button
            className="xl:w-[7vw] h-[5vh] bg-blue-800 text-white rounded-md m-1 w-37 p-1 border-none hover:bg-blue-900 active:bg-green-700"
            onClick={() => navigate("/create")}
          >
            Create cart
          </button>
          <button
            className="xl:w-[5vw] h-[5vh] bg-red-800 text-white rounded-md m-1 w-37 p-1 border-none hover:bg-red-900 active:bg-red-700"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
