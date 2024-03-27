import { createBrowserRouter } from "react-router-dom";
import AddBlog from "../pages/AddBlog/AddBlog";

import BlogDetail from "../pages/BlogDetails/BlogDetail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";

import PrivateRoute from "./PrivateRoute";
import Root from "../layout/Root";
import AllBlog from "../pages/AllBlog/AllBlog";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../layout/Dashboard";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import DashBoardHome from "../pages/DashBoardHome/DashBoardHome";
import AdRequest from "../pages/AdRequest/AdRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forget", element: <ForgetPassword /> },
      {
        path: "/blogs",
        element: <AllBlog />,
      },
      {
        path: "/blogs/:id",
        element: (
          <PrivateRoute>
            <BlogDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog />
          </PrivateRoute>
        ),
      },

      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/request/ad",
        element: (
          <PrivateRoute>
            <AdRequest/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
