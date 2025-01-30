import axios from "axios";
import React, { useEffect, useState } from "react";


const AdminList = () => {
  const [allUser, setAllUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/v1/users/allUsers`);
      setAllUser(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Admin List */}
      <div className="relative overflow-x-auto py-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {allUser.filter((user) => user.role === "admin").map((user, index) => (
              <tr key={user._id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.createdAt || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User List */}
      <div className="relative overflow-x-auto py-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">S.N.</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {allUser.filter((user) => user.role === "user").map((user, index) => (
              <tr key={user._id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.createdAt || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
