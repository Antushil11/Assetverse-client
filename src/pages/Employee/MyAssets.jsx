import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Box,
  Calendar,
  Building2,
  ChevronRight
} from "lucide-react";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data: assets = [], refetch, isLoading } = useQuery({
    queryKey: ["myAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/employee?email=${user.email}&status=assigned`
      );
      return res.data;
    },
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesType = filterType
      ? asset.type?.toLowerCase() === filterType.toLowerCase()
      : true;

    return matchesSearch && matchesType;
  });

  const handleAccept = async (asset) => {
    try {
      const res = await axiosSecure.patch(
        `/parcels/${asset._id}/status`,
        { status: "employee_arriving" }
      );

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Asset Accepted",
          text: "The asset has been successfully added to your active inventory.",
          showConfirmButton: false,
          timer: 2000,
          confirmButtonColor: "#4F46E5"
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrintPage = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">My Assets</h1>
          <p className="text-gray-500 font-medium">View and manage the company assets assigned to you.</p>
        </div>
        <button 
          onClick={handlePrintPage}
          className="flex items-center gap-2 bg-white border border-gray-100 text-gray-900 px-6 py-3.5 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1 active:scale-95 no-print"
        >
          <Printer size={20} />
          Print Inventory
        </button>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 no-print">
        {[
          { label: "Assigned", value: assets.length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Returnable", value: assets.filter(a => a.type === "Returnable").length, icon: Box, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Pending", value: assets.filter(a => a.status === "employee_arriving").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Active", value: assets.filter(a => a.status !== "employee_arriving").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
              <p className="text-xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center no-print">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by asset name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400 ml-4" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-700 cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredAssets.map((asset, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={asset._id}
              className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={asset.image} 
                  alt={asset.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
                    asset.type === "Returnable" ? "bg-indigo-600/80 text-white" : "bg-amber-500/80 text-white"
                  }`}>
                    {asset.type}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-primary transition-colors">{asset.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building2 size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">{asset.companyName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Requested</p>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={14} className="text-primary" />
                      <span className="text-xs font-bold">{new Date(asset.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Approved</p>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-xs font-bold">{new Date(asset.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${asset.status === "assigned" ? "bg-emerald-500 animate-pulse" : "bg-blue-500"}`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {asset.status === "assigned" ? "Active" : "Pending"}
                    </span>
                  </div>
                  
                  {asset.status === "employee_arriving" ? (
                    <button
                      onClick={() => handleAccept(asset)}
                      className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all no-print flex items-center gap-2"
                    >
                      Accept <ChevronRight size={16} />
                    </button>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAssets.length === 0 && (
        <div className="py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Box size={48} className="text-gray-200" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Inventory is empty</h3>
          <p className="text-gray-500 font-medium">You don't have any assets assigned to you yet.</p>
        </div>
      )}
    </motion.div>
  );
};

export default MyAssets;

