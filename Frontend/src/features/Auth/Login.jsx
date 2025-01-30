import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// const apiUrl = import.meta.env.REACT_APP_API_URL;

import Logo from "../../assets/images/logo JPEG.jpg";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // Using React Router's useNavigate for navigation
  const [errorMessage, setErrorMessage] = useState("");
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Submit form data to backend for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/v1/users/loginUser`,
        formData,
        { withCredentials: true }  // Ensure credentials (cookies) are included
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      // Redirect to profile
      navigate("/profile");

    } catch (error) {
      console.error("Error:", error);

      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );

      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50 relative">
      {/* Notification Div */}
      {errorMessage && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          {errorMessage}
        </div>
      )}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
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

          {/* Password */}
          <div className="mb-4">
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

          {/* Social Media Buttons */}
          <div className="mb-4">
            <p>Or login with:</p>
            <div className="w-full h-10 bg-blue-600 flex items-center justify-center rounded-lg mb-2 cursor-pointer">
              <p className="text-white">Facebook</p>
            </div>
            <div className="w-full h-10 bg-red-600 flex items-center justify-center rounded-lg mb-4 cursor-pointer">
              <p className="text-white">Google</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center">
            Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
