import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo design for Asse.png";
import useAuth from "../../../hooks/useAuth";

const Nabvar = () => {
  const {user,logOut} = useAuth()

  const handleLogOut = () =>{
    logOut()
    .then(result =>{
      console.log(result)
    })
    .catch(error =>{
      console.log(error)
    })
  }
  const links = (
    <>
   
      <li className=" ">
        <NavLink to="/">Home</NavLink>
      </li>

       <li><NavLink to={"/employee"}>Employee</NavLink></li>

        <li><NavLink to={"/employee"}>Employee</NavLink></li>
      {/* <li className="" >
        <details>
          <summary>Join as Employee</summary>
          <ul className="p-2  w-40 z-1 bg-secondary">
            <li>
              <NavLink>My Assets</NavLink>
            </li>
            <li>
              <NavLink>My Team</NavLink>
              <NavLink>Request Asset</NavLink>
            </li>
          </ul>
        </details>
      </li>
      <li className="">
        <details>
          <summary>Join as HR Manager</summary>
          <ul className="p-2  w-40 z-1 bg-secondary">
            <li>
              <NavLink>Asset List</NavLink>
            </li>
            <li>
              <NavLink>Add Asset</NavLink>
              <NavLink>All Requests</NavLink>
              <NavLink>Employee List</NavLink>
            </li>
          </ul>
        </details>
      </li> */}
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
          <a href="/" className="btn btn-ghost hover:bg-transparent hover:border-none normal-case text-xl">
            <img className="w-40" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {
            user ? 
            (
            <div className="flex">
              <div tabIndex={0} role="button" className="w-12 rounded-full">
                <img
                  className="rounded-full border-2 border-white cursor-pointer"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="profile"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#4A1FBF] rounded-box w-40"
              >
                
                <li><button onClick={handleLogOut}>Logout</button></li>
              </ul>
            </div>
          )
            

            : <Link to={'/login'} className="btn bg-primary">Log in</Link>
            
          }
        </div>
      </div>
    </div>
  );
};

export default Nabvar;
