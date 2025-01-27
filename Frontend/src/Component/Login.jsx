// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   // Define stored credentials (for testing; replace with real user data in production)
//   const storedData = {
//     email: "test@example.com",
//     password: "password123",
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//    const handleSubmit = async (e) => {
//      e.preventDefault(); // Prevent form submission from reloading the page
//      // console.log(handleSubmit, "handle submit call");

//      try {
//        const response = await axios.post(
//          "http://localhost:3000/api/auth/login",
//          formData
//        );
//        console.log(response, "Responsee");
//        navigate("/card");
//      } catch (error) {
//        console.error(error, "Errorrrrrrr");
//      }
//    };
 
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="h-[100vh] bg-gradient-to-b from-white to-gray-400"
//     >
//       <div className="text-center w-[30vw] h-[65vh] mb-14 border-2 border-black m-auto mt-16 rounded-md bg-white shadow-2xl shadow-black">
//         <h1 className="bg-blue-800 text-xl font-bold h-14 text-white flex items-center justify-center">
//           Login Form
//         </h1>
//         <div className="flex flex-col m-9 text-center">
//           <label className="text-start">Email:</label>
//           <input
//             name="email"
//             value={loginData.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Enter your email"
//             required
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-7 h-9 rounded"
//           />

//           <label className="text-start">Password:</label>
//           <input
//             name="password"
//             value={loginData.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Enter your password"
//             required
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-9 h-9 rounded"
//           />

//           <button
//             type="submit"
//             onClick={() => navigate("/card")}
//             className="h-9 border border-black w-[17vw] m-auto text-white bg-blue-800 rounded hover:bg-green-900 transition ease-in-out hover:border-2 hover:scale-110 duration-300 hover:shadow-md hover:shadow-black"
//           >
//             Login
//           </button>
//         </div>
//         <span>
//           Don't have an account?{" "}
//           <button className="text-blue-600 underline">Sign up</button>
//         </span>
//       </div>
//     </form>
//   );

// }




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   // Define stored credentials (for testing; replace with real user data in production)
//   const storedData = {
//     email: "test@example.com",
//     password: "password123",
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//    const handleSubmit = async (e) => {
//      e.preventDefault(); // Prevent form submission from reloading the page
//      // console.log(handleSubmit, "handle submit call");

//      try {
//        const response = await axios.post(
//          "http://localhost:3000/api/auth/login",
//          formData
//        );
//        console.log(response, "Responsee");
//        navigate("/card");
//      } catch (error) {
//        console.error(error, "Errorrrrrrr");
//      }
//    };
 
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="h-[100vh] bg-gradient-to-b from-white to-gray-400"
//     >
//       <div className="text-center w-[30vw] h-[65vh] mb-14 border-2 border-black m-auto mt-16 rounded-md bg-white shadow-2xl shadow-black">
//         <h1 className="bg-blue-800 text-xl font-bold h-14 text-white flex items-center justify-center">
//           Login Form
//         </h1>
//         <div className="flex flex-col m-9 text-center">
//           <label className="text-start">Email:</label>
//           <input
//             name="email"
//             value={loginData.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Enter your email"
//             required
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-7 h-9 rounded"
//           />

//           <label className="text-start">Password:</label>
//           <input
//             name="password"
//             value={loginData.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Enter your password"
//             required
//             className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-9 h-9 rounded"
//           />

//           <button
//             type="submit"
//             onClick={() => navigate("/card")}
//             className="h-9 border border-black w-[17vw] m-auto text-white bg-blue-800 rounded hover:bg-green-900 transition ease-in-out hover:border-2 hover:scale-110 duration-300 hover:shadow-md hover:shadow-black"
//           >
//             Login
//           </button>
//         </div>
//         <span>
//           Don't have an account?{" "}
//           <button className="text-blue-600 underline">Sign up</button>
//         </span>
//       </div>
//     </form>
//   );

// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      // Send login data to backend for verification
      const response = await axios.post("http://localhost:3000/api/auth/login", loginData);

      // If login is successful
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem('token', response.data.token); // Optionally, handle response data
        navigate("/card"); // Redirect to card page
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      // Handle login errors
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };
 
    return (
    <form onSubmit={handleSubmit} className="h-[100vh] bg-gradient-to-b from-white to-gray-400">
      <div className="text-center w-[30vw] h-[65vh] mb-14 border-2 border-black m-auto mt-16 rounded-md bg-white shadow-2xl shadow-black">
        <h1 className="bg-blue-800 text-xl font-bold h-14 text-white flex items-center justify-center">
          Login Form
        </h1>
        <div className="flex flex-col m-9 text-center">
          <label className="text-start">Email:</label>
          <input
            name="email"
            value={loginData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            required
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-7 h-9 rounded"
          />

          <label className="text-start">Password:</label>
          <input
            name="password"
            value={loginData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter your password"
            required
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg mb-9 h-9 rounded"
          />

          <button
            type="submit"
            className="h-9 border border-black w-[17vw] m-auto text-white bg-blue-800 rounded hover:bg-green-900 transition ease-in-out hover:border-2 hover:scale-110 duration-300 hover:shadow-md hover:shadow-black"
          >
            Login
          </button>
        </div>
        <span>
          Don't have an account?{" "}
          <button className="text-blue-600 underline" onClick={()=>navigate("/Registration")}>Sign up</button>
        </span>
      </div>
    </form>
  );
}

