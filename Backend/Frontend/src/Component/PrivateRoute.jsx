import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem('token'); // Check if user is authenticated
  return auth ? <Outlet /> : <Navigate to={'/login'} />; // If authenticated, allow access; otherwise, redirect to signup
};

export default PrivateComponent;
