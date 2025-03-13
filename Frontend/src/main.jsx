import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


// Importing Components
import App from "./App";
import Home from "./features/Pages/Home.jsx";

// Nav Imports
import Sports from "./features/Pages/nav/Sports.jsx";
import Technology from "./features/Pages/nav/Technology.jsx";
import Business from "./features/Pages/nav/Business.jsx";
import Entertainment from "./features/Pages/nav/Entertainment.jsx";
import Health from "./features/Pages/nav/Health.jsx";
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
import { AuthProvider, ProtectedRoute } from "./utils/AuthProvide.jsx";
import Signup from "./features/Auth/Signup.jsx";
import Login from "./features/Auth/Login.jsx";
import Profile from './features/UserProfile/Profile.jsx'
import PostPage from "./features/Pages/PostPage.jsx";
import PageNotFound from "./features/Pages/PageNotFound.jsx";
import Finance from "./features/Pages/nav/Finance.jsx";

const baseURL =
  import.meta.env.REACT_APP_API_NODE_ENV === "development"
    ? import.meta.env.REACT_APP_API_DEVELOPMENT_URL
    : `https://news-app-backend-ruby.vercel.app`;

// const baseURL = import.meta.env.REACT_APP_API_DEVELOPMENT_URL

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const Navigation = () => (
  <ul className="flex flex-wrap items-center gap-4 text-white font-bold text-sm sm:text-base">
    <li><a href="/sports">Sports</a></li>
    <li><a href="/technology">Technology</a></li>
    <li><a href="/business">Business</a></li>
    <li><a href="/entertainment">Entertainment</a></li>
    <li><a href="/health">Health</a></li>
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
      { path: "finance", element: <Finance /> },
      { path: "business", element: <Business /> },
      { path: "technology", element: <Technology /> },
      { path: "entertainment", element: <Entertainment /> },
      { path: "health", element: <Health /> },
      { path: "sports", element: <Sports /> },
      { path: "opinion", element: <Opinion /> },
      { path: "post/:postId", element: <PostPage /> },
      { path: "*", element: <PageNotFound /> },

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
    path: "/auth",
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
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

