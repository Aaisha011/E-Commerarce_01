import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Loginprotected = () => {
  const isLoggedIn = localStorage.getItem('token'); // Replace 'user' with your login token key if different
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default Loginprotected;