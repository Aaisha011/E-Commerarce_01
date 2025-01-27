//  <Route element={<Loginprotected />}>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Route>




//  import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const Loginprotected = () => {
//   const isLoggedIn = localStorage.getItem('user'); // Replace 'user' with your login token key if different
//   return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
// };

// export default Loginprotected;