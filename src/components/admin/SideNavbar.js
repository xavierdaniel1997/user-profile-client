// SideNavbar.js
import React from 'react';
import { FaUserPlus, FaCog, FaTachometerAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    const user = useSelector(store => store.auth.user)
    const dispatch = useDispatch()
    const imageUrl = user?.image
    ? `http://localhost:8000/${user.image}`
    : 'https://via.placeholder.com/40';

    const handleLogout = () => {
      dispatch(logout())
    }
  return (
    <div className="bg-blue-700 text-white w-64 h-screen flex flex-col justify-between p-4 fixed top-0 left-0">
      <div>
        <div className="text-center mb-8">
          <Link to="/dashboard"><h1 className="text-2xl font-bold">FINDER</h1></Link>
        </div>
        <nav>
          <ul>
            <li className="py-2 flex items-center">
              <FaTachometerAlt className="mr-2" />
              <Link to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</Link>
            </li>
            <li className="py-2 flex items-center">
              <FaUserPlus className="mr-2" />
              <Link to="addNew" className="text-lg hover:text-gray-300">Add User</Link>
            </li>
            <li className="py-2 flex items-center">
              <FaUsers className="mr-2" />
              <a href="#" className="text-lg hover:text-gray-300">Admin</a>
            </li>
            <li className="py-2 flex items-center">
              <FaCog className="mr-2" />
              <a href="#" className="text-lg hover:text-gray-300">Settings</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col items-center mb-4">
        <img src={imageUrl} alt="User Avatar" className="rounded-full mb-2 w-24 h-24 object-cover" />
        <span className="font-semibold mb-2">{user?.fullName}</span>
        <button className="flex items-center text-white-500" onClick={handleLogout}>
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
