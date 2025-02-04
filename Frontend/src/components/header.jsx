import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo JPEG.jpg";
import { toast } from "react-toastify";
import Advertisement from "./advertisement";
import { getOneUser, Logout } from "../utils/User.Fetching";
import { DateAndTime } from "./DateAndTime";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");    
    if (!accessToken || accessToken === "undefined") return;

    const fetchProfile = async () => {
      try {
        const response = await getOneUser();
        console.log(response.message)
        if (response?.message) {
          setProfileData(response.message);
          setIsAdmin(response.message.role === "admin");
          setIsUserLogin(true);
        }
      } catch (err) {
        if (err.response?.status !== 401) { // Ignore Unauthorized errors
          console.error("Error fetching profile:", err);
          setError("Failed to fetch profile data.");
        }
      }
    };

    fetchProfile();
  }, []);


  return (
    <>
      <header>
        {/* Top Bar */}
        <div className="flex flex-wrap bg-red-600 px-4 sm:px-10 justify-between items-center h-7 text-white text-sm">
          <div className="flex items-center gap-4">
            <span>
              <i className="fa-solid fa-phone"></i> 9800000000
            </span>
            <span>
              <i className="fa-solid fa-envelope"></i> newsapp@gmail.com
            </span>
          </div>
          <div className="flex gap-3">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-facebook-messenger"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-tiktok"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </div>

        {/* Logo and Time Section */}
        <div className="flex flex-wrap justify-between items-center px-4 sm:px-10 py-3">
          <div>
            <Link to="/">
              <img src={logo} alt="News Logo" className="h-16" />
            </Link>
          </div>
          <div className="hidden sm:block">
            <Advertisement />
          </div>

          <div className="text-lg text-center font-Kantipur">
            <DateAndTime />
          </div>
        </div>
      </header>

      <nav className="sticky top-0 left-0 bg-blue-500 px-4 py-3 sm:px-10 flex items-center justify-between flex-wrap z-10">
        {/* Mobile Menu Icon */}
        <button className="text-white text-2xl sm:hidden" onClick={toggleMenu}>
          <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col sm:flex-row items-center gap-4 text-white font-bold text-sm sm:text-base ${
            menuOpen ? "block" : "hidden sm:flex"
          }`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/finance">Finance</Link>
          </li>
          <li>
            <Link to="/technology">Technology</Link>
          </li>
          <li>
            <Link to="/business">Business</Link>
          </li>
          <li>
            <Link to="/entertainment">Entertainment</Link>
          </li>
          <li>
            <Link to="/sports">Sports</Link>
          </li>
          <li>
            <Link to="/health">Health</Link>
          </li>
          <li>
            <Link to="/opinion">Opinion</Link>
          </li>
        </ul>

        {/* Search and Account Dropdown */}
        <div className="flex items-center gap-4">
          <input
            className="mx-2 px-2 py-1 bg-slate-100 rounded-lg focus:outline-none w-32 sm:w-48"
            type="text"
            placeholder="Search news..."
          />
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white rounded-full shadow-md hover:shadow-lg focus:outline-none"
            >
              {isUserLogin ? (
                <img
                 src={profileData?.profilePicture}
                  className="w-7 h-8 rounded-full"
                  alt="Profile"
                />
              ) : (
                <i className="fa-regular fa-user text-lg w-7"></i>
              )}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                {isUserLogin ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={Logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100"
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
