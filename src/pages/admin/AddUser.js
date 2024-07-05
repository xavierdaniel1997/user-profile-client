import axios from 'axios';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  })
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  const handleCheckBoxChange = (e) => {
    setFormData({
        ...formData,
        isAdmin: e.target.checked
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("form the addNew form ", formData)

    const postData = new FormData()
    postData.append("image", image)
    for(const key in formData){
        postData.append(key, formData[key])
    }
    try{
        const response = await axios.post("http://localhost:8000/api/admin/addUser", postData, {
            withCredentials: true
        })
        toast.success(response?.data?.message)
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            isAdmin: false,
        })
        setImage(null)
        setTimeout(() => {
            navigate("/dashboard")
        },400)
    }catch(error){
        console.log(error)
        if (error.response) {
            toast.error(error.response.data.message || "Registration failed. Please try again.");
          }
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New User</h1>
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUserAlt className="text-gray-500 w-16 h-16" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span>Choose Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-6">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={formData.isAdmin}
            onChange={handleCheckBoxChange}
          />
          <label className="ml-2 text-gray-700 font-bold">Register as Admin</label>
        </div>
        <div className="flex gap-5 items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </button>
          <button
            type="reset"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddUser;
