import { createBrowserRouter } from "react-router-dom";
import AddBlog from "../pages/AddBlog/AddBlog";

import BlogDetail from "../pages/Blog Details/BlogDetail";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";

import PrivateRoute from "./PrivateRoute";
import Root from "../layout/Root";
import AllBlog from "../pages/All Blog/AllBlog";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../layout/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/add",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <AllBlog></AllBlog>,
      },
      {
        path: "/blogs/:id",
        element: (
          <PrivateRoute>
            <BlogDetail></BlogDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/tag",
        element: <h1 className="h-screen">Hello from dashboard</h1>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
