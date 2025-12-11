import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxoisSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["Asset-List", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleAssetDelete = (id) => {
    console.log(id);
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
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
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
  return (
    <div>
      <h2>AssetList {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={parcel.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{parcel.name}</td>
                <td>{parcel.type}</td>
                <td>{parcel.quantity}</td>
                <td>{parcel.dateAdded}</td>
                <th>
                  <button className="btn mr-2 hover:bg-primary">
                    <FaRegEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleAssetDelete(parcel._id)}
                    className="btn hover:bg-primary"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
