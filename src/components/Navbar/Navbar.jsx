import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdPets } from "react-icons/md";
import { AuthContext } from '../../provider/AuthProvider';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-semibold px-3 py-1 hover:text-indigo-500 hover:bg-indigo-50 ${isActive ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`;

  const publicLinks = (
    <>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
      </li>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/pets&Supplies" className={navLinkClass}>Pets & Supplies</NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
      </li>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/pets&Supplies" className={navLinkClass}>Pets & Supplies</NavLink>
      </li>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/add-listing" className={navLinkClass}>Add Listing</NavLink>
      </li>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/my-listings" className={navLinkClass}>My Listings</NavLink>
      </li>
      <li className='transition hover:scale-110 hover:underline'>
        <NavLink to="/my-orders" className={navLinkClass}>My Orders</NavLink>
      </li>
    </>
  );

  return (
    <div className='bg-indigo-50 shadow-md py-2'>
      <div className="navbar container mx-auto">
        {/* Left nav*/}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {user ? privateLinks : publicLinks}
            </ul>
          </div>
          <Link to="/" className="text-4xl font-bold text-indigo-600 flex gap-1 hover:text-indigo-700 items-center">
            <MdPets size={30}/> PawMart
          </Link>
        </div>

        {/* Center nav*/}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? privateLinks : publicLinks}
          </ul>
        </div>

        {/* Right nav*/}
        <div className="navbar-end space-x-3">
          {user ? (
            <div className="flex items-center gap-2">
              
              <img
                src={user.photoURL || "https://i.ibb.co/Fx2g3mD/user.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-indigo-400 object-cover"
              />
              <span className="font-medium text-gray-700">{user.displayName || "User"}</span>
              
              <button
                onClick={handleLogout}
                className="btn px-5 bg-indigo-500 text-white hover:bg-indigo-700 transition hover:scale-110"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn px-5 bg-indigo-500 text-white hover:bg-indigo-700 transition hover:scale-110">
                Login
              </NavLink>
              <NavLink to="/register" className="btn bg-indigo-500 text-white hover:bg-indigo-700 transition hover:scale-110">
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
