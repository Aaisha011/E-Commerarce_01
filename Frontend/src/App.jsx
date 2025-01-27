import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Component/Card";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./Component/ProductDetail";
import Login from "./Component/Login.jsx";
import Registration from "./Component/Registration.jsx";
import Create from "./Component/Create.jsx";
import Update from "./Component/Update.jsx";
import CategoryPage from "./Component/Category.jsx";
import PrivateComponent from "./PrivateComponent.jsx";

// Helper to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route element={<PrivateComponent />}>
          <Route path="/card" element={<Card />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="create" element={<Create />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
      </Routes>
    </Router>
  );
}

export default App;


































