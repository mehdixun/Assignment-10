import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again!", {
        position: "top-center",
      });
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-semibold px-3 py-1 rounded-md hover:text-indigo-500 hover:bg-indigo-100 transition-all ${
      isActive ? "border-b-2 border-indigo-600 text-indigo-600" : ""
    }`;

    // Public Navlinks
  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/pets&Supplies" className={navLinkClass}>
          Pets & Supplies
        </NavLink>
      </li>
    </>
  );

  // Private Navkinks
  const privateLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/pets&Supplies" className={navLinkClass}>
          Pets & Supplies
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-listing" className={navLinkClass}>
          Add Listing
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-listings" className={navLinkClass}>
          My Listings
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-orders" className={navLinkClass}>
          My Orders
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-indigo-50 shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto py-5 px-4 flex justify-between items-center">

        {/* Website Name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-4xl font-bold text-indigo-600 hover:text-indigo-700"
        >
          <MdPets size={30} />
          PawMart
        </Link>

        <ul className="hidden lg:flex space-x-4">{user ? privateLinks : publicLinks}</ul>

        {/* Mobile responsive dropdown */}
        <div className="lg:hidden dropdown">
          <div tabIndex={0} className="btn btn-ghost p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 shadow-md rounded-lg mt-2 w-52 p-2"
          >
            {user ? privateLinks : publicLinks}
          </ul>
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/Fx2g3mD/user.png"}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
              />
              <span className="font-medium text-gray-700">{user.displayName || "User"}</span>
              <button
                onClick={handleLogout}
                className="btn bg-indigo-500 text-white px-5 py-2 hover:bg-indigo-700 transition-transform transform hover:scale-105"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn bg-indigo-500 text-white px-5 py-2 hover:bg-indigo-700 transition-transform transform hover:scale-105"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn bg-indigo-500 text-white px-5 py-2 hover:bg-indigo-700 transition-transform transform hover:scale-105"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
