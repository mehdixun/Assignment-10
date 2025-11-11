import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login"
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ProductDetails from "../pages/ProductDetails";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";


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
          path: "/product/:id",
          element: <ProductDetails></ProductDetails>

        },
        {
          path: "/listing-details/:id",
          element: <ListingDetails></ListingDetails>
        },
        {
          path: "/add-listing",
          element: <AddListing></AddListing>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        
    ]
  },
]);

export default router;