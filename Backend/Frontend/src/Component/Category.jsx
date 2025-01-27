import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategorySelect() {
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3000/categories/category",
          "category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle form submission to navigate to the selected category page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select a category...
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        +dbb
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Go
        </button>
      </form>
    </div>
  );
}
