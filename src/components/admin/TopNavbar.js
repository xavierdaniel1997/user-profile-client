// TopNavbar.js
import React from "react";
import {FaBell, FaSearch, FaSignOutAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../../redux/authSlice";

const TopNavbar = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch()
  const imageUrl = user?.image
    ? `http://localhost:8000/${user.image}`
    : "https://via.placeholder.com/40";

    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center  top-0 left-0 z-10 ml-64 w-10/12 fixed">
      {/* Left section: Search bar */}
      <div className="flex items-center w-1/3 relative pl-5">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-4 pr-10 border rounded"
        />
        <button className="absolute right-2 top-3">
          <FaSearch className="text-gray-500" />
        </button>
      </div>

      {/* Right section: User avatar, name, bell icon, and logout button */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <img
            src={imageUrl}
            alt="User Avatar"
            className="rounded-full mr-2 w-12 h-12 object-cover"
          />
          <span className="font-semibold">{user?.fullName}</span>
        </div>
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <FaBell />
        </a>
        <button className="flex items-center text-blue-500 hover:text-blue-700 px-4 py-2" onClick={handleLogout}>
          Logout <FaSignOutAlt className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
