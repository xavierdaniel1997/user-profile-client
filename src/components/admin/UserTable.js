

import axios from "axios";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "../../redux/userDetailsSlice";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";



const UserTable = () => {
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch()
  const userDetailsItem = useSelector(store => store.userDetails.userDetailsItem)
  
  const getUserDatas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getUsers"
      );
      dispatch(addUserDetails(response?.data?.users))
      setUserDetails(response?.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDatas();
  }, []);

  if (!userDetailsItem.length) return <div>Loading...</div>;
  console.log("userDetails from dashboard", userDetailsItem)
  const userData = userDetailsItem.filter((users) => users?.isAdmin===false)


  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center py-5">
      <h1 className="font-bold text-2xl">Active Users</h1>
      <div className="flex items-center gap-2 p-2  bg-blue-500 rounded-md hover:bg-blue-400">
        <Link to="addNew"><button className="text-white">
          Add User
        </button>
        </Link>
        <IoAddOutline size={24} className="text-white" />
      </div>
    </div>
      
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 h-16">
          <tr>
            <th className="w-12 px-4 py-2"></th>
            <th className="px-4 py-2 text-left">Client Name</th>
            <th className="px-4 py-2 text-left">Designation</th>
            <th className="px-4 py-2 text-left">Email Address</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => ( 
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-4 py-2 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2">
                <img
                  src={user.image ? `http://localhost:8000/${user.image}` : "https://via.placeholder.com/40"}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full bg-gray-300 mr-2"
                />
                </div>
                {user?.fullName}
              </td>
              <td className="px-4 py-2">{user?.designation}</td>
              <td className="px-4 py-2">{user?.email}</td>
              <td className="px-4 py-2">{user?.phone}</td>
              <td className="px-4 py-2">{user?.company}</td>
              <td className="px-4 py-2">{user?.state}</td>
              <td className="px-4 py-2">
                <Link to={`viewUser/${user?._id}`}><button className="text-blue-600 hover:text-blue-800">
                  View Details
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;


