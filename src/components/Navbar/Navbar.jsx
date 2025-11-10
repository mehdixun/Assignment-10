import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdPets } from "react-icons/md";
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

  // ❌ const { user } = use(AuthContext)
  // ✅ সঠিকটা নিচে
  const { user } = useContext(AuthContext);

  const links = (
    <>
      <li className='font-semibold hover:text-indigo-500 hover:bg-indigo-50'>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className='font-semibold hover:text-indigo-500 hover:bg-indigo-50'>
        <NavLink to="/pets&Supplies">Pets & Supplies</NavLink>
      </li>
    </>
  );

  return (
    <div className='bg-indigo-50 shadow-lg'>
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-5xl font-bold text-indigo-500 flex gap-1 hover:text-indigo-700">
            <MdPets /> PawMart
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>

        <div className="navbar-end space-x-3">
          {
            user ? (
              <button className="btn px-5 bg-indigo-500 text-white hover:text-black hover:bg-indigo-700">
                Sign Out
              </button>
            ) : (
              <>
                <NavLink to="/login" className="btn px-5 bg-indigo-500 text-white hover:text-black hover:bg-indigo-700">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn bg-indigo-500 text-white hover:text-black hover:bg-indigo-700">
                  Register
                </NavLink>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
