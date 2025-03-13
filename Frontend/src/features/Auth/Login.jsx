import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for show/hide password
import Logo from "../../assets/images/logo JPEG.jpg";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error

    try {
      const response = await axios.post("/api/v1/users/loginUser", formData, { withCredentials: true });

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      window.location.assign("/profile");
      // navigate("/profile"); // Redirect on success
    } catch (error) {
      console.error("Error:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect password. Please try again.");
        } else if (error.response.status === 404) {
          setErrorMessage("User not found. Please check your email.");
        } else {
          setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Server error. Please try again later.");
      }

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
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 pr-10"
              required
              autoComplete="current-password"
            />
            <span className="absolute inset-y-0 right-3 flex items-center justify-center h-full cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center">
            Don't have an account? <Link to="/auth/signup" className="text-blue-600">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
