import React from 'react';
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import UserCard from '../global/UserCard';

const UserProfile = ({userData}) => {
  const dispatch = useDispatch()

  const imageUrl = userData?.image
  ? `http://localhost:8000/${userData.image}`
  : 'https://via.placeholder.com/150';

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <UserCard userData={userData} handleLogout={handleLogout}/>
    </div>
  );
};

export default UserProfile;




   // <div className="w-full max-w-5xl bg-white shadow-lg p-6 rounded-lg">
    //   <div className="flex">
    //     <img
    //       src={imageUrl}
    //       alt="User Avatar"
    //       className="rounded-full w-32 h-32 object-cover"
    //     />
    //     <div className="ml-6 flex-grow flex flex-col justify-center">
    //       <h2 className="text-3xl font-bold">{userData?.fullName}</h2>
    //       <p className="text-gray-700 mt-2">
    //         {userData?.designation} at <a href="#" className="text-blue-500">{userData?.company}</a>
    //       </p>
    //       <p className="text-gray-700 mt-2">
    //         {userData?.email}
    //       </p>
    //       <div className="mt-4">
    //         <p className="text-gray-500 mb-2">Address:</p>
    //         <div className="flex flex-wrap">
    //         {userData.phone && <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
    //             {userData?.phone}
    //           </span>}
    //          {userData.state && <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
    //             {userData?.state}
    //           </span>}
    //           {userData.place && <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
    //             {userData?.place}
    //           </span>}
    //           {userData.zipCode && <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
    //             {userData?.zipCode}
    //           </span>}
            
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex items-end justify-end">
    //       <button className="flex items-center px-4 py-2 rounded-lg" onClick={handleLogout}>
    //         <FaSignOutAlt className="mr-2" />
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    // </div>

