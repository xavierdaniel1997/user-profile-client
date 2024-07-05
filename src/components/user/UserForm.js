import axios from 'axios';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { setUser } from '../../redux/authSlice';

const UserForm = () => { 

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch()
  const [updateForm, setUpdateForm] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    company: "",
    state: "",
    place: "",
    zipCode: "",
  })
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setUpdateForm({
        ...updateForm,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", image)
    for(const key in updateForm){
        formData.append(key, updateForm[key])
    }

    console.log("form the formData frm uerform", formData)
    console.log("image", image)

    try{
        const response = await axios.put("http://localhost:8000/api/user/update-user", formData, {
            withCredentials: true
        })
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
        setUpdateForm({
          fullName: "",
          designation: "",
          email: "",
          phone: "",
          company: "",
          state: "",
          place: "",
          zipCode: "",
        })
        console.log("form the edit form response", response)
    }catch(error){
        console.log(error)

    }
  }
  return (
    <div className="w-full max-w-5xl bg-white shadow-2xl p-6 rounded-lg">
      <div className="flex">
        <div className="w-1/3 flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-full w-32 h-32 object-cover mb-4"
            />
          ) : (
            <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center mb-4">
              <FaUserAlt className="text-gray-500 w-16 h-16" />
            </div>
          )}
          <label className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="w-2/3 ml-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input
                type="text"
                name='fullName'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.fullName : ""}
                value={updateForm.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Designation</label>
              <input
                type="text"
                name='designation'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.designation : ""}
                value={updateForm.designation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name='email'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.email: ""}
                value={updateForm.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input
                type="tel"
                name='phone'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.phone: ""}
                value={updateForm.phone}
                onChange={handleChange}

              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Company</label>
              <input
                type="text"
                name='company'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.company: ""}
                value={updateForm.company}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">State</label>
              <input
                type="text"
                name='state'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.state: ""}
                value={updateForm.state}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Place</label>
              <input
                type="text"
                name='place'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.place: ""}
                value={updateForm.place}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Zip Code</label>
              <input
                type="number"
                name='zipCode'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder={user? user.zipCode: ""}
                value={updateForm.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
              >
                Update Profile
              </button>
              <button
                type="reset"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UserForm;
