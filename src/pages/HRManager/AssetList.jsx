import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
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

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", type: "", quantity: 0 });

  const handleEditClick = (parcel) => {
    setEditingId(parcel._id);
    setEditValues({
      name: parcel.name,
      type: parcel.type,
      quantity: parcel.quantity,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = (id) => {
    axiosSecure
      .patch(`/parcels/${id}`, {
        name: editValues.name,
        type: editValues.type,
        quantity: Number(editValues.quantity),
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Asset updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          setEditingId(null);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to update asset",
        });
      });
  };

  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Your Asset has been deleted.", "success");
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div className="text-black">
      

      <div className="overflow-x-auto">
        <table className="table">
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
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={parcel.image} alt="Asset" />
                    </div>
                  </div>
                </td>

                {editingId === parcel._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editValues.name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="type"
                        value={editValues.type}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        value={editValues.quantity}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{parcel.name}</td>
                    <td>{parcel.type}</td>
                    <td>{parcel.quantity}</td>
                  </>
                )}

                <td>{parcel.dateAdded}</td>
                <th className="flex gap-2">
                  {editingId === parcel._id ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleSaveEdit(parcel._id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn mr-2 bg-primary text-white"
                        onClick={() => handleEditClick(parcel)}
                      >
                        <FaRegEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleAssetDelete(parcel._id)}
                        className="btn bg-primary text-white"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </>
                  )}
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
