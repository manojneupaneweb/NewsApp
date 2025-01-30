import React, { useState } from "react";
import Logo from "../../assets/images/logo JPEG.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.REACT_APP_API_URL;

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePicture: null,
  });

  // Handle input changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle file input change separately
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
    }));
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("profilePicture", formData.profilePicture);

    console.log(formData);
    

    try {
      const response = await axios.post(`${apiUrl}/api/v1/users/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      console.log("Registration successful! You can now login.");
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
    
  };

  return (
    <div className="flex items-center w-full h-screen">
      <div className="max-w-md mx-auto bg-white w-96 rounded-md flex justify-center flex-col">
        <Link to="/">
          <img className="h-15" src={Logo} alt="Logo" />
        </Link>
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="\d{10}"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Pic</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
              required
            />
          </div>

          <div>
            <p>Or use Social Media?</p>
            <div className="w-full h-7 bg-blue-600 flex items-center justify-center rounded-lg mb-2">
              <p className="text-white">Facebook</p>
            </div>
            <div className="w-full h-7 bg-red-600 flex items-center justify-center rounded-lg mb-5">
              <p className="text-white">Google</p>
            </div>
          </div>

          <div className="mb-4">
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Signup
            </button>
          </div>
          <p>
            You have an account? <Link to="/auth/login">Login</Link> Now
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
