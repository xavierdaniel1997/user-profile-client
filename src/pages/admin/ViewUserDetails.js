import React, {useEffect, useState} from "react";
import UserCard from "../../components/global/UserCard";
import axios from "axios";
import {useParams} from "react-router-dom";
import UpdateEditForm from "../../components/global/UpdateEditForm";
import {LuFileEdit} from "react-icons/lu";

const ViewUserDetails = () => {
  const {id} = useParams();
  const [getUser, setgetUser] = useState(null);

  const fetchUserDetials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/userById/${id}`
      );
      setgetUser(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDetials();
  }, []);

  return (
    <div className="flex justify-center items-center py-10 bg-slate-100">
      <div className="w-full max-w-5xl px-4">
        <UserCard userData={getUser} />
        <div className="flex items-center text-gray-600 gap-4">
          <h1 className="font-bold text-2xl py-10">Edit Your Profile</h1>
          <LuFileEdit size={24}/>
        </div>
        <UpdateEditForm/>
      </div>
    </div>
  );
};

export default ViewUserDetails;
