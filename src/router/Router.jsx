import { createBrowserRouter } from "react-router-dom";
import AddBlog from "../pages/AddBlog/AddBlog";

import AllBlog from "../pages/All Blog/AllBlog";
import BlogDetail from "../pages/Blog Details/BlogDetail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
        path: "/all",
        element: <AllBlog></AllBlog>,
        loader: () => fetch("http://localhost:5000/all"),
      },
      { path: "/featured", element: <Register></Register> },
      { path: "/wishlist", element: <Register></Register> },
      {
        path: "/all/:id",
        element: <BlogDetail></BlogDetail>,
        loader: ({ params }) => fetch(`http://localhost:5000/all/${params.id}`),
      },
    ],
  },
]);

export default router;
