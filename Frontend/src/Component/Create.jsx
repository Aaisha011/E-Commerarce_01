import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [formData, setFormData] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target?.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", image);
    formDataToSend.append("categoryID", formData.categoryID);

    try {
      const response = await axios.post(
        `http://localhost:3000/cards/card`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response Data:", response.data);

      setFormData({
        title: "",
        description: "",
        price: "",
        image: null,
        categoryID: "",
      });

      navigate("/card");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:3000/categories/categories"
        );

        setCategories(response.data); // Populate categories from API response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/categories/categories"
      );
      setCategories(response.data); // Assuming the API returns an array of category objects
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/categories/category`,
        {
          name: newCategory,
        }
      );

      if (response.data.success) {
        const addedCategory = response.data.category;

        // Add the new category to the dropdown list dynamically
        setCategories((prevCategories) => [...prevCategories, addedCategory]);

        // Close the popup and reset the input
        setNewCategory("");
        setShowCategoryPopup(false);
        toast.success("Category added successfully!");
      } else {
        toast.error(response.data.message || "Failed to add category.");
        setShowCategoryPopup(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error adding category. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-slate-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 w-[50vw]"
      >
        <h1 className="text-2xl font-bold mb-6">Create Form</h1>

        <label htmlFor="title" className="w-full mb-4">
          <span className="block text-left font-medium text-gray-700 mb-2">
            Title:
          </span>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Type title here..."
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label htmlFor="description" className="w-full mb-4">
          <span className="block text-left font-medium text-gray-700 mb-2">
            Description:
          </span>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Type description here..."
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label htmlFor="price" className="w-full mb-4">
          <span className="block text-left font-medium text-gray-700 mb-2">
            Price:
          </span>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price here..."
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label htmlFor="categoryID" className="w-full mb-4">
          <span className="block text-left font-medium text-gray-700 mb-2">
            Category:
          </span>
          <div className="flex flex-row gap-3">
            <select
              id="categoryID"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select a category...
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={setShowCategoryPopup}
              className="w-9 h-9 bg-green-600 text-white rounded-full flex justify-center items-center hover:bg-green-800"
            >
              +
            </button>
          </div>
        </label>

        <label htmlFor="image" className="w-full mb-4">
          <span className="block text-left font-medium text-gray-700 mb-2">
            Image:
          </span>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full"
          />
        </label>

        {formData.image && (
          <div className="w-full mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              Image Preview:
            </label>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>

      {/* Category Popup */}
      {showCategoryPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCategory}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Add
              </button>
              <button
                onClick={() => setShowCategoryPopup(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
