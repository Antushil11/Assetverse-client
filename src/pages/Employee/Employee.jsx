import React from "react";
import { NavLink } from "react-router";

const Employee = () => {
  return (
    <div>
      {/* <li>
        <NavLink to={"/employee"}>Employee</NavLink>
      </li> */}
      <li className=" ">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="">
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
    </div>
  );
};

export default Employee;
