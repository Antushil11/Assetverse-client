import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/AssetVerse logo with.png";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Nabvar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li className=" ">
        <NavLink to="/">Home</NavLink>
      </li>
      


       {
        role ==='admin' && <li>
        <NavLink to={"/HR-Manager"}>HR Manager</NavLink>
      </li>
      }

     {
      role === 'employee' &&  <li>
        <NavLink to={"/Employee"}>Employee</NavLink>
      </li>
     } 

      

      <li className=" ">
        <NavLink to="/CaseStudies">Case Studies</NavLink>
      </li>
      <li className=" ">
        <NavLink to="/RecentWork">Recent Work</NavLink>
      </li>
      <li className=" ">
        <NavLink to="/Creative-Work">Creative Work</NavLink>
      </li>


    </>
  );

  return (
    // sticky top-0 z-50
    <div className="text-white bg-[#4A1FBF] ">
      <div className="navbar  max-w-7xl mx-auto shadow-sm  rounded-2xl">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a
            href="/"
            className="btn btn-ghost hover:bg-transparent hover:border-none normal-case text-xl"
          >
            <img className="w-40" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            (user === "admin" ? (
              <li>
                <NavLink to={"/HR-Manager"}>HR Manager</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to={"/Employee"}>Employee</NavLink>
              </li>
            ),
            (
              <div className="flex items-center justify-center">
                <div tabIndex={0} role="button" className="w-12 rounded-full">
                  <img
                    className="rounded-full border-2 border-white cursor-pointer"
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt="profile"
                  />
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content p-2 shadow bg-[#4A1FBF] rounded-box w-40"
                >
                  <li>
                    <button
                      className="btn btn-primary text-[14px]"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className="">
            <Link to={"/login"} className="btn bg-primary text-white">
              Log in
            </Link>
            <Link to={'/register'} className="btn bg-primary text-white">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nabvar;
