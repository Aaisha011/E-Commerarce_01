import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ store }) {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    // localStorage.removeItem("userToken"); 
  }
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (email === store.email && password === store.password) {
      navigate("/login");
    } else {
      console.log("Credentials do not match");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[100vh] bg-gradient-to-b from-white to-gray-400"
    >
      <div className="text-center w-[27vw] h-[60vh] mb-14 border-2 border-black m-auto mt-16 rounded-md bg-white shadow-2xl shadow-black">
        <h1 className="bg-blue-800 text-xl font-bold h-14 text-white flex items-center justify-center">
          Logout Form
        </h1>
        <div className="flex flex-col m-9 text-center">
          <label className="text-start">Email:</label>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter an email"
            required
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg shadow-white mb-7 h-9 rounded"
          />

          <label className="text-start">Password:</label>
          <input
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password here"
            required
            className="border border-black hover:border-2 hover:border-blue-500 hover:shadow-lg shadow-white mb-9 h-9 rounded"
          />

          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="h-9 border border-black w-[17vw] m-auto text-white bg-blue-800 rounded hover:bg-green-900 active:bg-green-950 active:text-black transition ease-in-out delay-150 hover:border-2 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-md hover:shadow-black"
          >
            Logout
          </button>
        </div>
      </div>
    </form>
  );
}
