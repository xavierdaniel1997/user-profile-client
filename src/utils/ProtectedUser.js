import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUser = () => {
    const user = useSelector((store) => store.auth.user);
    console.log("form protAdmin ", user.isAdmin);
    return user.isAdmin === false ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedUser