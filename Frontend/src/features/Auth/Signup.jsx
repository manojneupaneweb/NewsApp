import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.REACT_APP_API_URL;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await axios.post("/api/v1/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed.");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-0">
      <div className="bg-white max-w-sm sm:max-w-md md:max-w-lg w-full rounded-lg p-6 shadow-lg">
        {/* <Link to="/">
          <img className="h-16 mx-auto" src={Logo} alt="Logo" />
        </Link> */}
        <h2 className="text-2xl font-bold text-center mt-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" id="phone" name="phone" pattern="\d{10}" value={formData.phone} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Pic</label>
            <input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md mt-1" />
          </div>

          <div className="mb-4">
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Signup
            </button>
          </div>

          <p className="text-center">Already have an account? <Link to="/auth/login" className="text-blue-500">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
