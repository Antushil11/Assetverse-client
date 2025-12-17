import React from "react";
import useAxiosSecure from "../../hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: employee = [] } = useQuery({
    queryKey: ["employee", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee");
      return res.data;
    },
  });

  const updateEmployeeStatus = (employee,status) =>{
    const updateInfo = { status: status, email:employee.email};
    axiosSecure.patch(`/employee/${employee._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Employee status has set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

  }

  const handleAssetDelete = (employee) => {
      console.log(employee);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/employee/${employee}`).then((res) => {
            console.log(res.data);
  
            if (res.data.deletedCount) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your Asset has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    };



  const handleApproval = (employee) => {
    
   updateEmployeeStatus(employee, 'approved')
  };

  const handleRejection = employee =>{
    updateEmployeeStatus(employee,'rejected')

  }



  return (
    <div className="text-black">
      
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employe, index) => (
              <tr key={employe._id}>
                <th>{index + 1}</th>
                <td>{employe.name}</td>
                <td>Quality Control Specialist</td>
                <td>{employe.createdAt}</td>
                <td>{employe.workStatus}</td>
                <td>
                  <p
                    className={`${
                      employe.status === "approved" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {employe.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(employe)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button onClick={() => handleRejection(employe)} className="btn">
                    <IoPersonRemove />
                  </button>
                  <button onClick={() => handleAssetDelete(employe)} className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
