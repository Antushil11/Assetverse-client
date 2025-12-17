import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxoisSecure";
import Swal from "sweetalert2";

const RequestanAsset = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  const { data: parcels = [], refetch} = useQuery({
    queryKey: ["parcels", "completed"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?status=completed");
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: [
      "users",
      selectedParcel ? selectedParcel.quantity : 0,
      "available",
    ],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?status=completed`);
      return res.data;
    },
  });

  const openAssignRiderModel = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignUser = (user) => {
    const userAssignInfo = {
      userId: user._id,
      userEmail: user.email,
      userName: user.displayName,
      parceId: selectedParcel._id,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, userAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {

            riderModalRef.current.close()
            refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Company has been assigneed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="text-black">
      

      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parcels.map((parcel) => (
          <div key={parcel._id} className="card bg-base-100 w-96  shadow-sm">
            <figure className="px-10 pt-10">
              <img src={parcel.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title"> Name: {parcel.name}</h2>

              <p> Type: {parcel.type}</p>
              <p>Available Quantity: {parcel.availableQuantity}</p>

              <div className="card-actions">
                <button
                  onClick={() => openAssignRiderModel(parcel)}
                  className="btn btn-primary"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Company: {users.length}</h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
             
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignUser(user)}
                        className="btn btn-primary "
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestanAsset;
