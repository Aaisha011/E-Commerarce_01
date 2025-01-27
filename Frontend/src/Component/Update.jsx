import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    categoryID:"",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID of the item to update from the route params.
  const [categories, setCategories] = useState([]);


  // Fetch existing data to prepopulate the form
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/cards/cards/${id}`);
        // console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          image: imagePreview, // Keep this null since we're not directly setting the file
        });
        setImagePreview(`http://localhost:3000/uploads/${data.image}`); //Set the existing image as the preview
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    setImagePreview(URL.createObjectURL(e.target.files[0])); // Update the preview
  };

  // Handle form submission for updating
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send (handle file uploads with FormData)
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("categoryID", formData.categoryID);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/cards/cards/${id}`,
        formDataToSend
      );

      // if (!response.ok) {
      //   throw new Error("Failed to update data");
      // }

      console.log("Update successful!");
      navigate("/card"); // Redirect to the card listing page
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories/category`
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


  return (
    <div className="flex items-center justify-center h-full bg-slate-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 h-full m-14"
      >
        <h1 className="text-2xl font-bold mb-6 text-black">Update Form</h1>
        <div className="grid grid-cols-2 gap-5">
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
            ></textarea>
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
              className="w-full"
            />
          </label>

          {imagePreview && (
            <div className="w-full mb-4">
              <span className="block text-sm text-gray-500">
                Image Preview:
              </span>
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          onClick={handleChange}
          className="px-6 py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}
