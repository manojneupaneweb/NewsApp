import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo JPEG.jpg";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-200 text-black p-4">
        <h1 className="text-xl font-bold text-center mb-6">
          <Link to="/">
            <img src={Logo} className="w-56" alt="" />
          </Link>
        </h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="ms-2 text-black font-bold bg-slate-100 hover:bg-cyan-700 p-2 block rounded-md transition-colors duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/adminlist"
              className="ms-2 text-black font-bold bg-slate-100 hover:bg-cyan-700 p-2 block rounded-md transition-colors duration-300"
            >
              Admin List
            </Link>
          </li>
          <li>
            <Link
              to="/admin/postnews"
              className="ms-2 text-black font-bold bg-slate-100 hover:bg-cyan-700 p-2 block rounded-md transition-colors duration-300"
            >
              Post News
            </Link>
          </li>
          <li>
            <Link
              to="/admin/allpost"
              className="ms-2 text-black font-bold bg-slate-100 hover:bg-cyan-700 p-2 block rounded-md transition-colors duration-300"
            >
              All Post
            </Link>
          </li>

          <li>
            <Link
              to="/admin/addmanagement"
              className="ms-2 text-black font-bold bg-slate-100 hover:bg-cyan-700 p-2 block rounded-md transition-colors duration-300"
            >
              Add Management
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Top Navigation Bar */}
        <div className="bg-gray-300 text-black p-4 mb-6 flex justify-between items-center">
          <div className="font-bold text-lg">Admin Dashboard</div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Logout
          </button>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
