import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login"
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ProductDetails from "../pages/ProductDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path:"/product/:id",
          element: <ProductDetails></ProductDetails>

        },
        {
          path: "/register",
          element: <Register></Register>
        },
        
    ]
  },
]);

export default router;