import React, { useEffect } from "react";
import Navbar from "../../components/user/Navbar";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import UserProfile from "../../components/user/UserProfile";
import UserForm from "../../components/user/UserForm";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

const HomePage = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch()
  const getUserDetails = async () => {
    const response = await axios.get("http://localhost:8000/api/user/user-details", {
      withCredentials: true
    })
    console.log("form the home", response)
    dispatch(setUser(response.data.user))
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className="flex justify-center items-center py-10 bg-gray-50">
      <div className="w-full max-w-5xl px-4">
        <UserProfile userData={user}/>
        <h1 className="font-bold text-2xl py-10">Update Your Profile</h1>
        <UserForm/>
      </div>
    </div>
  );
};

export default HomePage;
