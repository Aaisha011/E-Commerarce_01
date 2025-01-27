// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Registration() {
//   const navigate = useNavigate();

//   // Form data state
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent form submission from reloading the page

//     // Validate required fields (checking only username, email, and password)
//     if (!formData.username || !formData.email || !formData.password) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       // Send data to the backend
//       const response = await axios.post("http://localhost:3000/api/auth/signup", formData, {
//         headers: {
//           "Content-Type": "application/json", // Ensure data is sent as JSON
//         },
//       });

//       // Log the response for debugging
//       console.log(response.data);

//       if (response.status === 201) {
//         // Redirect to login page upon successful registration
//         navigate("/login");
//       }
//     } catch (error) {
//       // Handle API errors
//       if (error.response) {
//         console.error("Error:", error.response.data.message);
//         alert(error.response.data.message); // Show the error message from the backend
//       } else {
//         console.error("Unexpected error:", error);
//         alert("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="min-h-screen h-[100vh] bg-gradient-to-b from-white to-gray-400"
//     >
//       <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-auto text-center mb-14 border-2 border-black m-auto mt-16 rounded-md bg-white shadow-2xl shadow-black">
//         <h1 className="bg-blue-800 text-xl font-bold h-14 text-white flex items-center justify-center">
//           Registration Form
//         </h1>
//         <div className="flex flex-col m-9 text-center">
//           <label className="text-start">Username:</label>
//           <input
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             type="text"
//             placeholder="Enter your username"
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-3 h-9 rounded"
//             required
//           />
//           <label className="text-start">Email:</label>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Enter an email"
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-3 h-9 rounded"
//             required
//           />
//           <label className="text-start">Password:</label>
//           <input
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Enter password"
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-5 h-9 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="h-9 border border-black w-[17vw] m-auto text-white bg-blue-800 rounded hover:bg-green-900 transition ease-in-out hover:border-2 hover:scale-110 duration-300 hover:shadow-md hover:shadow-black"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Validate required fields (checking only username, email, and password)
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure data is sent as JSON
        },
      });

      // Log the response for debugging
      console.log(response.data);

      if (response.status === 201) {
        // Redirect to login page upon successful registration
        navigate("/");
      }
    } catch (error) {
      // Handle API errors
      if (error.response) {
        console.error("Error:", error.response.data.message);
        alert(error.response.data.message); // Show the error message from the backend
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen h-[100vh] bg-gradient-to-b from-white to-gray-400"
    >
      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-auto text-center mb-14 border-2 border-black m-auto mt-16 rounded-md bg-white shadow-2xl shadow-black">
        <h1 className="bg-blue-800 text-xl font-bold h-14 text-white flex items-center justify-center">
          Registration Form
        </h1>
        <div className="flex flex-col m-9 text-center">
          <label className="text-start">Username:</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Enter your username"
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-3 h-9 rounded"
            required
          />
          <label className="text-start">Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter an email"
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-3 h-9 rounded"
            required
          />
          <label className="text-start">Password:</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-5 h-9 rounded"
            required
          />
          <button
            type="submit"
            className="h-9 border border-black w-[17vw] m-auto text-white bg-blue-800 rounded hover:bg-green-900 transition ease-in-out hover:border-2 hover:scale-110 duration-300 hover:shadow-md hover:shadow-black"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

