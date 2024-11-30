/* eslint-disable no-unused-vars */
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/books">Books</a>
      </li>
      <li>
        <a href="/addbook">Add Book</a>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`dark:bg-slate-900 dark:text-white max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50${
          sticky
            ? "dark:bg-slate-600 dark:text-white sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <a className="text-2xl font-bold cursor-pointer">Book Store</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block"></div>

            {authUser ? (
              <Logout />
            ) : (
              <div className="">
                <Link
                  to="/login"
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
