import axios from "axios";
import React from "react";
import {FaEdit, FaSignOutAlt} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserDetail } from "../../redux/userDetailsSlice";

const UserCard = ({userData, handleLogout}) => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const imageUrl = userData?.image
    ? `http://localhost:8000/${userData.image}`
    : "https://via.placeholder.com/150";

  // const toggleBlockUser = async () => {
  //   try{
  //     const resposne = await axios.put(`http://localhost:8000/api/admin/block-unBlock/${userData._id}`)
  //     console.log("9999995555555556666666666666", resposne)
  //   }catch(error){
  //     console.log(error)
      
  //   }
  // }

  const handleDeleteUser = async () => {
    try{
      const response = await axios.delete(`http://localhost:8000/api/admin/delete/${userData._id}`)
      dispatch(deleteUserDetail(userData._id))
      navigate("/dashboard")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-5xl bg-white shadow-lg p-6 rounded-lg">
      <div className="flex">
        <img
          src={imageUrl}
          alt="User Avatar"
          className="rounded-full w-32 h-32 object-cover"
        />
        <div className="ml-6 flex-grow flex flex-col justify-center">
          <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold">{userData?.fullName}</h2>
          {/* {user.isAdmin && <button className={`text-white px-2 rounded-md py-1 ${userData?.isBlock ? "bg-red-600" : "bg-green-500"}`} onClick={toggleBlockUser}>{userData?.isBlock ? "Block Me" : "UnBlock Me"}</button>} */}
          {user.isAdmin && <button><RiDeleteBin6Line size={24} onClick={handleDeleteUser}/></button>}
          </div>
          <p className="text-gray-700 mt-2">
            {userData?.designation} at{" "}
            <Link to="#" className="text-blue-500">
              {userData?.company}
            </Link>
          </p>
          <p className="text-gray-700 mt-2">{userData?.email}</p>
          <div className="mt-4">
            <p className="text-gray-500 mb-2">Address:</p>
            <div className="flex flex-wrap">
              {userData?.phone && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {userData?.phone}
                </span>
              )}
              {userData?.state && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {userData?.state}
                </span>
              )}
              {userData?.place && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {userData?.place}
                </span>
              )}
              {userData?.zipCode && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {userData?.zipCode}
                </span>
              )}
            </div>
          </div>
        </div>
        {user?.isAdmin === false && (
          <div className="flex items-end justify-end">
            <button className="flex items-center px-4 py-2 rounded-lg" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
