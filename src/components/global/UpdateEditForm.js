import axios from "axios";
import React, {useState} from "react";
import {FaUserAlt} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEditForm = () => {
  const {id} = useParams()
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    company: "",
    state: "",
    place: "",
    zipCode: "",
    isAdmin: false
  })
  const navigate = useNavigate()
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

  const handleCheckBoxChange = (e) => {
    setUpdateForm({
        ...updateForm,
        isAdmin: e.target.checked
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("form the updatPage of admin", updateForm)
    const formData = new FormData()
    formData.append("image", image)
    for(const key in updateForm){
        formData.append(key, updateForm[key])
    }
    try{
        const response = await axios.put(`http://localhost:8000/api/admin/user-update/${id}`, formData)
        navigate("/dashboard")
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
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
          </label>
        </div>
        <div className="w-2/3 ml-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Full Name"
                name="fullName"
                value={updateForm.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Designation
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Designation"
                name="designation"
                value={updateForm.designation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Email"
                name="email"
                value={updateForm.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Phone"
                name="phone"
                value={updateForm.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Company
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Company"
                name="company"
                value={updateForm.company}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                State
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="State"
                name="state"
                value={updateForm.state}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Place
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Place"
                name="place"
                value={updateForm.place}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Zip Code
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Zip Code"
                name="zipCode"
                value={updateForm.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={updateForm.isAdmin}
                  onChange={handleCheckBoxChange}
                />
                <span className="ml-2 text-gray-700">Make it as admin</span>
              </label>
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
      <ToastContainer />
    </div>
  );
};

export default UpdateEditForm;
