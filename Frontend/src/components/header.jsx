import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo JPEG.jpg";
import { toast } from "react-toastify";
import Advertisement from "./advertisement";
import { getOneUser, Logout } from "../utils/User.Fetching";
import { DateAndTime } from "./DateAndTime";
import axios from "axios";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [kathmanduwaither, setKathmanduwaither] = useState(null)
  const waither = async () => {
    try {
      const response = await axios.get("/api/v1/posts/waither");
      setKathmanduwaither(response.data)
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  };

  useEffect(() => {
    waither();
  }, []);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getOneUser();

        if (response?.message) {
          setProfileData(response.message);
          setIsAdmin(response.message.role === "admin");
          setIsUserLogin(true);
        }
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <>
      <header className="relative">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 sm:px-8 lg:px-12 py-2 text-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6 text-xs sm:text-sm">
              <span className="flex items-center gap-2 transition-transform hover:scale-105">
                <i className="fa-solid fa-phone text-red-200"></i>
                <span className="text-red-100">9800000000</span>
              </span>
              <span className="flex items-center gap-2 transition-transform hover:scale-105">
                <i className="fa-solid fa-envelope text-red-200"></i>
                <span className="text-red-100">newsapp@gmail.com</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-red-200 text-xs hidden sm:block">Follow us:</span>
              <div className="flex gap-3 text-red-200">
                {['facebook', 'facebook-messenger', 'instagram', 'tiktok', 'youtube'].map((platform) => (
                  <i
                    key={platform}
                    className={`fa-brands fa-${platform} transition-all duration-300 hover:text-white hover:scale-110 cursor-pointer`}
                  ></i>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`bg-white shadow-lg transition-all duration-300 ${isScrolled ? 'py-2 shadow-xl' : 'py-4'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* Date and Time */}
              <div className="text-center lg:text-right">
                <div className="rounded-lg px-4 py-2 shadow-sm">
                  <DateAndTime />
                </div>
              </div>
              {/* Logo */}
              <Link
                to="/"
                className="transform transition-transform duration-300  hover:scale-105"
              >
                <img
                  src={logo}
                  alt="News Logo"
                  className={`transition-all duration-300  ${isScrolled ? 'h-12' : 'h-16'}`}
                />
              </Link>
              {kathmanduwaither && (
                <div>
                  <h2 className="font-bold">{kathmanduwaither.temp}°C काठमाडौं</h2>
                  <p className="font-bold">काठमाडौं मा वायुको गुणस्तर: {kathmanduwaither.aqi}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={toggleMenu}
              >
                <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
              </button>

              {/* Navigation Links */}
              <ul className={`absolute lg:static top-full left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent transition-all duration-300 ease-in-out ${menuOpen ? 'block opacity-100' : 'hidden lg:flex opacity-0 lg:opacity-100'
                }`}>
                <div className="flex flex-col lg:flex-row items-center gap-1 py-4 lg:py-0">
                  {[
                    { path: "/", label: "Home" },
                    { path: "/finance", label: "Finance" },
                    { path: "/technology", label: "Technology" },
                    { path: "/business", label: "Business" },
                    { path: "/entertainment", label: "Entertainment" },
                    { path: "/sports", label: "Sports" },
                    { path: "/health", label: "Health" },
                    { path: "/opinion", label: "Opinion" }
                  ].map((item) => (
                    <li key={item.path} className="w-full lg:w-auto">
                      <Link
                        to={item.path}
                        className="block px-6 lg:px-4 py-3 lg:py-2 text-white font-semibold text-sm lg:text-base transition-all duration-200 hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-blue-200 border-b lg:border-b-0 border-blue-500 lg:border-none"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>

              {/* Search and Profile */}
              <div className="flex items-center gap-4 ml-auto lg:ml-0">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news..."
                    className="w-32 sm:w-48 pl-4 pr-10 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <i className="fa-solid fa-search"></i>
                  </button>
                </form>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="relative group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
                      {isUserLogin ? (
                        <img
                          src={profileData?.profilePicture}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white"
                          alt="Profile"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {!isUserLogin || !profileData?.profilePicture ? (
                        <i className="fa-regular fa-user text-white text-lg"></i>
                      ) : null}
                    </div>
                    <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                      ></div>

                      {/* Dropdown Content */}
                      <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform origin-top-right transition-all duration-300 scale-95 opacity-0 animate-dropdown">
                        <div className="p-2">
                          {isUserLogin ? (
                            <>
                              {isAdmin && (
                                <Link
                                  to="/admin/dashboard"
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <i className="fa-solid fa-gauge-high text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                                  Dashboard
                                </Link>
                              )}
                              <Link
                                to="/profile"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                                onClick={() => setIsOpen(false)}
                              >
                                <i className="fa-regular fa-user text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                                Profile
                              </Link>
                              <button
                                onClick={() => {
                                  Logout();
                                  setIsOpen(false);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                              >
                                <i className="fa-solid fa-arrow-right-from-bracket group-hover:scale-110 transition-transform duration-200"></i>
                                Logout
                              </button>
                            </>
                          ) : (
                            <>
                              <Link
                                to="/auth/signup"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                                onClick={() => setIsOpen(false)}
                              >
                                <i className="fa-regular fa-user-plus text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                                Sign Up
                              </Link>
                              <Link
                                to="/auth/login"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-semibold hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                                onClick={() => setIsOpen(false)}
                              >
                                <i className="fa-regular fa-right-to-bracket text-blue-600 group-hover:scale-110 transition-transform duration-200"></i>
                                Login
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Advertisement */}
      <div className="lg:hidden bg-gray-50 py-2 px-4">
        <Advertisement />
      </div>

      <style>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Header;