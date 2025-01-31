import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePic from "../../assets/images/profile.jpg";
const apiUrl = import.meta.env.REACT_APP_API_URL;

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [IsAdmin, setIsAdmin] = useState(null);

  // Fetch Profile Data
  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/v1/users/getUserProfile");
      setProfileData(response.data.message);
      setError(null);
      if (response.data.message.roleAdmin == "admin") {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to fetch profile data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center w-full py-6 bg-gray-50">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-semibold text-gray-800">Profile</h2>
        </div>

        {/* Profile Info */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex items-center space-x-8 mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
                <img
                  src={profileData?.profilePicture || ProfilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {profileData?.name}
                </h3>
                <p className="text-gray-500">Role: {profileData?.role}</p>
                <p className="text-gray-500">Email: {profileData?.email}</p>
                <p className="text-gray-500">Phone: {profileData?.phone}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-8 mb-8">
              <Link
                to="/profile/edit"
                className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>

            {IsAdmin && (
              <>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Post News</h4>
                  <Link
                    to="/post-news"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Post New Article
                  </Link>
                </div>

                {/* Recent News Section */}
                <div className="mt-10 space-y-4">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Recent News</h4>
                  {profileData?.recentNews?.length ? (
                    <ul className="space-y-2 text-gray-600">
                      {profileData.recentNews.map((news, index) => (
                        <li key={index}>
                          <Link
                            to={`/article/${news.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {news.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No recent news available.</p>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
