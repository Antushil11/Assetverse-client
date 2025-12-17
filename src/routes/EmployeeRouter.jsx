import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

const EmployeeRouter = ({children}) => {
  const { loading,user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "employee") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default EmployeeRouter;
