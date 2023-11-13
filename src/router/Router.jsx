import { createBrowserRouter } from "react-router-dom";
import AddBlog from "../pages/AddBlog/AddBlog";

import AllBlog from "../pages/All Blog/AllBlog";
import BlogDetail from "../pages/Blog Details/BlogDetail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";
import Update from "../pages/Update Blog/Update";
import Wishlist from "../pages/Wishlist/Wishlist";

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
      { path: "/wishlist", element: <PrivateRoute>
        <Wishlist></Wishlist>
      </PrivateRoute> },
      {
        path: "/all/:id",
        element: <BlogDetail></BlogDetail>,
        loader: ({ params }) => fetch(`http://localhost:5000/all/${params.id}`),
      },
      {
        path: "/update/:id",
        element: <PrivateRoute>
          <Update></Update>
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/all/${params.id}`),
      },
    ],
  },
]);

export default router;
