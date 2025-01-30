import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

// Importing Components
import App from "./App";
import Home from "./features/Pages/Home.jsx";


// Nav Imports
import Travel from "./features/Pages/nav/Travel.jsx";
import World from "./features/Pages/nav/World.jsx";
import Sports from "./features/Pages/nav/Sports.jsx";
import Technology from "./features/Pages/nav/Technology.jsx";
import Business from "./features/Pages/nav/Business.jsx";
import Entertainment from "./features/Pages/nav/Entertainment.jsx";
import Health from "./features/Pages/nav/Health.jsx";
import Science from "./features/Pages/nav/Science.jsx";
import Opinion from "./features/Pages/nav/Opinion.jsx";

// Admin Pages
import Dashboard from "./features/Admin/Dashboard.jsx";
import PostNews from "./features/Admin/PostNews.jsx";
import AdminLayout from "./features/Admin/AdminLayout.jsx";
import AdminList from "./features/Admin/AdminList.jsx";
import AddManagement from "./features/Admin/AddManagement.jsx";
import AllPosts from "./features/Admin/AllPosts.jsx";
import EditPost from "./features/Admin/EditPost.jsx";

//Auth Pages
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Signup from "./features/Auth/Signup.jsx";
import Login from "./features/Auth/Login.jsx";
import AuthProvider from "./utils/AuthProvider.jsx";

import Profile from "./features/UserProfile/Profile.jsx";
axios.defaults.baseURL = `http://localhost:3000`;
axios.defaults.withCredentials = true;

const Navigation = () => (
  <ul className="flex flex-wrap items-center gap-4 text-white font-bold text-sm sm:text-base">
    <li><a href="/world">World</a></li>
    <li><a href="/sports">Sports</a></li>
    <li><a href="/technology">Technology</a></li>
    <li><a href="/business">Business</a></li>
    <li><a href="/entertainment">Entertainment</a></li>
    <li><a href="/health">Health</a></li>
    <li><a href="/science">Science</a></li>
    <li><a href="/travel">Travel</a></li>
    <li><a href="/opinion">Opinion</a></li>
  </ul>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <Navigation />
      </>
    ),
    children: [
      { path: "", element: <Home /> },
       { path: "world", element: <World /> },
      { path: "sports", element: <Sports /> },
      { path: "technology", element: <Technology /> },
      { path: "business", element: <Business /> },
      { path: "entertainment", element: <Entertainment /> },
      { path: "health", element: <Health /> },
      { path: "science", element: <Science /> },
      { path: "travel", element: <Travel /> },
      { path: "opinion", element: <Opinion /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
     
    ],
  },
  {
    path: "/",
    children: [
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute admin={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "adminlist", element: <AdminList /> },
      { path: "allpost", element: <AllPosts /> },
      { path: "editpost/:postId", element: <EditPost /> },
      { path: "postnews", element: <PostNews /> },
      { path: "addmanagement", element: <AddManagement /> },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

