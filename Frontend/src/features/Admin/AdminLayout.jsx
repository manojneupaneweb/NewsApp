import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaUsers, FaNewspaper, FaClipboardList, FaAd, FaUserCircle, FaSignOutAlt, FaEllipsisV } from "react-icons/fa";
import Logo from "../../assets/images/logo JPEG.jpg";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed lg:relative z-20 lg:block ${sidebarOpen ? "block" : "hidden"} lg:w-64 w-60 bg-gray-800 text-white p-4 h-full lg:h-auto`}>
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <img src={Logo} className="w-48" alt="Logo" />
          </Link>
          <button className="lg:hidden text-white text-2xl" onClick={() => setSidebarOpen(false)}>
            &times;
          </button>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-white font-bold hover:bg-gray-600 p-2 rounded-md transition">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/adminlist" className="flex items-center gap-2 text-white font-bold hover:bg-gray-600 p-2 rounded-md transition">
              <FaUsers /> Admin List
            </Link>
          </li>
          <li>
            <Link to="/admin/postnews" className="flex items-center gap-2 text-white font-bold hover:bg-gray-600 p-2 rounded-md transition">
              <FaNewspaper /> Post News
            </Link>
          </li>
          <li>
            <Link to="/admin/allpost" className="flex items-center gap-2 text-white font-bold hover:bg-gray-600 p-2 rounded-md transition">
              <FaClipboardList /> All Post
            </Link>
          </li>
          <li>
            <Link to="/admin/addmanagement" className="flex items-center gap-2 text-white font-bold hover:bg-gray-600 p-2 rounded-md transition">
              <FaAd /> Add Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        {/* Top Navigation Bar */}
        <div className="bg-gray-800 text-white p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              <FaEllipsisV />
            </button>
            <div className="font-bold text-lg">Admin Dashboard</div>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2" onClick={() => setProfileOpen(!profileOpen)}>
              <FaUserCircle className="text-2xl" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Menu */}
        {menuOpen && (
          <div className="bg-gray-700 text-white p-4 rounded-md shadow-lg absolute top-16 left-4 lg:hidden">
            <ul className="space-y-4">
              <li>
                <Link to="/admin/dashboard" className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition">
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/adminlist" className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition">
                  <FaUsers /> Admin List
                </Link>
              </li>
              <li>
                <Link to="/admin/postnews" className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition">
                  <FaNewspaper /> Post News
                </Link>
              </li>
              <li>
                <Link to="/admin/allpost" className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition">
                  <FaClipboardList /> All Post
                </Link>
              </li>
              <li>
                <Link to="/admin/addmanagement" className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition">
                  <FaAd /> Add Management
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
