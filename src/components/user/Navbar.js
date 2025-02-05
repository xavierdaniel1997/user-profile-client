// src/components/Navbar.js
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authSlice";
import { showUserDate } from "../../redux/userDetailsSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const user = useSelector(store => store.auth.user)
  const userDate = useSelector(store => store.userDetails.date)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDate = () => {
    dispatch(showUserDate())
  }

  const imageUrl = user?.image
  ? `http://localhost:8000/${user.image}`
  : 'https://via.placeholder.com/32';

  return (
    <nav className="bg-gray-200 p-4 px-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-gray-800 text-xl font-bold" onClick={handleDate}>Profile</span>
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">
              Login 
            </button>
          )}
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">
            Login
          </button> */}
          <div className="flex items-center">
            <span className="text-gray-800 mr-2">{user.fullName} {userDate}</span>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={imageUrl} 
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
