/*

import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  console.log("from protected route ", isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
*/

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/authSlice"; // Adjust the path if necessary
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/verify");
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error("Token validation failed", error);
        dispatch(setUser(null));
        if (error.response) {
          toast.error(error.response.data.message || "Session expired. Please log in again.");
        } 
      } 
    };

    validateToken();
  }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
  // }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
