import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ProductDetails from "../pages/ProductDetails";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import PrivateRoute from "../provider/PrivateRoute";
import MyOrders from "../pages/MyOrders";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import MyListing from "../pages/MyListings";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";


const HomeLayoutWithToast = () => (
  <>
    <HomeLayout />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayoutWithToast></HomeLayoutWithToast>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register>
        <HomeLayoutWithToast></HomeLayoutWithToast>
      </Register> },

      // 🔒 Private Routes
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing></AddListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails></ListingDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },

      { path: "/product/:id", element: <ProductDetails></ProductDetails> },
      {
        path: "/pets&supplies",
        element: <PetsAndSupplies></PetsAndSupplies>,
      },
      {
        path: "/my-listings",
        element: <MyListing></MyListing>,
      },

      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredProduct></CategoryFilteredProduct>,
      },
    ],
  },
]);

export default router;
