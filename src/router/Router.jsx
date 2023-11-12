import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";
import AddBlog from "../pages/AddBlog/AddBlog";

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
      { path: "/featured", element: <Register></Register> },
      { path: "/wishlist", element: <Register></Register> },
    ],
  },
]);

export default router;
