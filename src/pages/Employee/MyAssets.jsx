import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxoisSecure";
import Swal from "sweetalert2";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Search & Filter State
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/employee?email=${user.email}&status=assigned`
      );
      return res.data;
    },
  });

  // Filtered Data
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesType = filterType
      ? asset.type?.toLowerCase() === filterType.toLowerCase()
      : true;

    return matchesSearch && matchesType;
  });

  // Accept Asset
  const handleAccept = async (asset) => {
    try {
      const res = await axiosSecure.patch(
        `/parcels/${asset._id}/status`,
        { status: "employee_arriving" }
      );

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire("Success", "Asset accepted successfully", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Print Whole Page
  const handlePrintPage = () => {
    window.print();
  };

  return (
    <div className="text-black p-4">

      {/* Search & Filter (Hidden in Print) */}
      <div className="flex gap-3 mb-4 no-print">
        <input
          type="text"
          placeholder="Search by asset name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, index) => (
              <tr key={asset._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={asset.image}
                    alt="asset"
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.companyName}</td>
                <td>{asset.createdAt}</td>
                <td>{asset.dateAdded}</td>
                <td>
                  {asset.status === "employee_arriving" ? (
                    <button
                      onClick={() => handleAccept(asset)}
                      className="btn btn-primary btn-sm no-print"
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="font-semibold">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center no-print">
        <button onClick={handlePrintPage} className="btn btn-primary">
          Print Page
        </button>
      </div>
    </div>
  );
};

export default MyAssets;
