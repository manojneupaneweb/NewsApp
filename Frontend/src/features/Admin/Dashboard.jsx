import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [allUser, setAllUser] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/v1/users/allUsers`);
      setAllUser(response.data.users || []);
    } catch (error) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/v1/posts/getallposts`);
      setAllPost(response.data.posts || []);
    } catch (error) {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Data for the Bar chart
  const chartData = {
    labels: ['Users', 'Admins', 'Posts'],
    datasets: [
      {
        label: 'Count',
        data: [
          allUser.length,
          allUser.filter((user) => user.role === "admin").length,
          allPost.length
        ],
        backgroundColor: ['#4CAF50', '#FFEB3B', '#2196F3'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{allUser.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer">
          <h3 className="text-xl font-semibold">Total Admins</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {allUser.filter((user) => user.role === "admin").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer">
          <h3 className="text-xl font-semibold">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-600">{allPost.length}</p>
        </div>
      </div>

      {/* Chart for users and posts */}
      <div className="mt-6 w-min">
        <h3 className="text-xl font-semibold mb-3">Statistics</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Users & Posts */}
      <div className="mt-6 w-max">
        <h3 className="text-xl font-semibold mb-3">Recent Users</h3>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {allUser.slice(0, 5).map((user) => (
            <li key={user._id} className="py-2 border-b">
              {user.name} - {user.role}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Recent Posts</h3>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {allPost.slice(0, 5).map((post) => (
            <li key={post._id} className="py-2 border-b">
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
