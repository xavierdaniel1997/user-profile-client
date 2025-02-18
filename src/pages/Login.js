import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { setUser } from '../redux/authSlice';
import { validateLoginForm } from '../utils/validateForm';

const Login = () => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleOnChange = (e) => {
 
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validateError = validateLoginForm(formData)
        setErrors(validateError)
        if(Object.keys(validateError).length===0) 
        try{
            const response = await axios.post("http://localhost:8000/api/user/auth", formData, {
                withCredentials: true
            }) 
            dispatch(setUser(response.data.user))
            toast.success(response.data.message)
            navigate(response.data.user.isAdmin ? "/dashboard" : "/")
            console.log("respon from login", response)
        }catch(error){
            console.error(error)
            if (error.response) {
                toast.error(error.response.data.message || "Login failed ");
              }
        }
        console.log("form data", formData)
    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address {errors.email && <p className="text-red-500 text-sm px-2">{errors.email}</p>}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password {errors.password && <p className="text-red-500 text-sm px-2">{errors.password}</p>}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-indigo-500">
                Register here P@ssw0rd!
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
