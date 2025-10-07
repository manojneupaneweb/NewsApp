import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  FaBars, 
  FaTachometerAlt, 
  FaUsers, 
  FaNewspaper, 
  FaClipboardList, 
  FaAd, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaTimes,
  FaChevronRight,
  FaBell,
  FaSearch,
  FaCog,
  FaHome,
  FaEnvelope,
  FaCalendarAlt,
  FaEdit
} from "react-icons/fa";
import Logo from "../../assets/images/logo JPEG.jpg";
import PropTypes from "prop-types";
import axios from "axios";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch admin data
  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/users/getUserProfile");
      setAdminData(response.data.message || response.data.user);
      
      
      // Simulate notifications
      setNotifications([
        { id: 1, type: 'info', message: 'Welcome back! You have 5 new posts to review', time: '2 min ago' },
        { id: 2, type: 'warning', message: 'Storage is at 85% capacity', time: '1 hour ago' },
        { id: 3, type: 'success', message: 'New user registered successfully', time: '3 hours ago' }
      ]);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      // Fallback data
      setAdminData({
        name: "Admin User",
        email: "admin@newsapp.com",
        role: "Administrator",
        joinDate: "2024-01-15",
        lastLogin: new Date().toISOString(),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      });
    } finally {
      setLoading(false);
    }
  };

  // Stats data
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalAdmins: 0,
    activeUsers: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchAdminData();
    
    // Simulate stats data
    setStats({
      totalPosts: 1247,
      totalAdmins: 8,
      activeUsers: 5423,
      revenue: 12540
    });
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("dashboard")) setActiveMenu("dashboard");
    else if (path.includes("adminlist")) setActiveMenu("adminlist");
    else if (path.includes("postnews")) setActiveMenu("postnews");
    else if (path.includes("allpost")) setActiveMenu("allpost");
    else if (path.includes("addmanagement")) setActiveMenu("addmanagement");
  }, [location]);

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      key: "dashboard",
      color: "from-blue-500 to-blue-600",
    },
    {
      path: "/admin/adminlist",
      icon: FaUsers,
      label: "Admin List",
      key: "adminlist",
      color: "from-green-500 to-green-600",
    },
    {
      path: "/admin/postnews",
      icon: FaNewspaper,
      label: "Post News",
      key: "postnews",
      color: "from-purple-500 to-purple-600"
    },
    {
      path: "/admin/allpost",
      icon: FaClipboardList,
      label: "All Posts",
      key: "allpost",
      color: "from-orange-500 to-orange-600",
    },
    {
      path: "/admin/addmanagement",
      icon: FaAd,
      label: "Ad Management",
      key: "addmanagement",
      color: "from-pink-500 to-pink-600",
    }
  ];

  const NavItem = ({ item }) => (
    <li>
      <Link 
        to={item.path} 
        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative ${
          activeMenu === item.key 
            ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105` 
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        onClick={() => {
          setActiveMenu(item.key);
          if (window.innerWidth < 1024) setSidebarOpen(false);
        }}
      >
        <item.icon className={`text-lg ${activeMenu === item.key ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
        <span className="font-medium">{item.label}</span>
        
        
        
        {activeMenu === item.key && (
          <FaChevronRight className="ml-auto text-sm" />
        )}
      </Link>
    </li>
  );

  NavItem.propTypes = {
    item: PropTypes.shape({
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      color: PropTypes.string,
    }).isRequired
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative z-40 lg:z-auto transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
      } w-64 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700 h-full flex flex-col`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className={`flex items-center gap-3 transition-all duration-300 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <img 
                src={Logo} 
                alt="Logo" 
                className={`transition-all duration-300 ${
                  sidebarOpen ? "w-32" : "w-10 rounded-lg"
                }`}
              />
            </Link>
            <button 
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <NavItem key={item.key} item={item} />
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700 min-h-screen">
          <div className={`flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 backdrop-blur-sm transition-all duration-300 ${
            !sidebarOpen && "justify-center"
          }`}>
            <div className="relative">
              <img 
                src={adminData?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&facepad=2"} 
                alt="Admin" 
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {loading ? "Loading..." : adminData?.name || "Admin User"}
                </p>
                <p className="text-gray-400 text-xs truncate">
                  {loading ? "loading..." : adminData?.email || "admin@newsapp.com"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between p-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
              >
                <FaBars className="text-lg" />
              </button>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors hidden lg:block"
              >
                <FaBars className="text-lg" />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                  <FaHome className="text-sm" />
                  <span>Home</span>
                </Link>
                <FaChevronRight className="text-xs" />
                <span className="font-medium text-gray-900 capitalize">
                  {activeMenu || "Dashboard"}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all duration-300"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <FaBell className="text-lg" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Notifications Dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-30 hidden hover:block group-hover:block">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">{notifications.length} new notifications</p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Settings */}
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <FaCog className="text-lg" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img 
                    src={adminData?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&facepad=2"} 
                    alt="Admin" 
                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {loading ? "Loading..." : adminData?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {loading ? "loading..." : adminData?.role || "Administrator"}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden animate-scale-in">
                      {/* Profile Info */}
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center gap-3">
                          <img 
                            src={adminData?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&facepad=2"} 
                            alt="Admin" 
                            className="w-12 h-12 rounded-full border-2 border-white"
                          />
                          <div>
                            <p className="font-semibold">{adminData?.name || "Admin User"}</p>
                            <p className="text-blue-100 text-sm">{adminData?.email || "admin@newsapp.com"}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Profile Details */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaEnvelope className="text-gray-400" />
                          <span>{adminData?.email || "admin@newsapp.com"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt className="text-gray-400" />
                          <span>Joined {adminData?.joinDate ? new Date(adminData.joinDate).toLocaleDateString() : "Jan 15, 2024"}</span>
                        </div>
                      </div>
                      
                      <div className="p-2 border-t border-gray-100">
                        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                          <FaUserCircle className="text-gray-400" />
                          Profile Settings
                        </button>
                        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                          <FaEdit className="text-gray-400" />
                          Edit Profile
                        </button>
                        <button 
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {adminData?.name?.split(' ')[0] || 'Admin'}! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your news portal today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-100">Total Posts</p>
                    <p className="text-2xl font-bold">{stats.totalPosts.toLocaleString()}</p>
                  </div>
                  <FaNewspaper className="text-2xl opacity-80" />
                </div>
                <div className="mt-2 text-blue-100 text-sm">+12% from last month</div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-100">Active Admins</p>
                    <p className="text-2xl font-bold">{stats.totalAdmins}</p>
                  </div>
                  <FaUsers className="text-2xl opacity-80" />
                </div>
                <div className="mt-2 text-green-100 text-sm">+2 this quarter</div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-purple-100">Active Users</p>
                    <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                  </div>
                  <FaUserCircle className="text-2xl opacity-80" />
                </div>
                <div className="mt-2 text-purple-100 text-sm">+324 today</div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-orange-100">Revenue</p>
                    <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
                  </div>
                  <FaAd className="text-2xl opacity-80" />
                </div>
                <div className="mt-2 text-orange-100 text-sm">+8.2% from last month</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;