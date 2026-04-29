import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Box,
  Layers,
  Calendar
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: assets = [], refetch, isLoading } = useQuery({
    queryKey: ["Asset-List", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", type: "", quantity: 0 });

  const handleEditClick = (asset) => {
    setEditingId(asset._id);
    setEditValues({
      name: asset.name,
      type: asset.type,
      quantity: asset.quantity,
    });
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
            title: "Asset Updated",
            text: "The asset information has been successfully updated.",
            showConfirmButton: false,
            timer: 2000,
            background: "#fff",
            color: "#000"
          });
          setEditingId(null);
        }
      });
  };

  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Delete Asset?",
      text: "This action cannot be undone. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Asset has been removed from inventory.", "success");
          }
        });
      }
    });
  };

  const filteredAssets = assets.filter(asset => 
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Asset Inventory</h1>
          <p className="text-gray-500 font-medium">Manage and track your company's physical and digital assets.</p>
        </div>
        <Link 
          to="/HR-Manager/Add-an-Asset"
          className="flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          Add New Asset
        </Link>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Assets", value: assets.length, icon: Box, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Returnable", value: assets.filter(a => a.type === "Returnable").length, icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Low Stock", value: assets.filter(a => a.quantity < 5).length, icon: Filter, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by asset name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Asset</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Type</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Inventory</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Added Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredAssets.map((asset, index) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={asset._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                          <img src={asset.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        {editingId === asset._id ? (
                          <input 
                            type="text"
                            value={editValues.name}
                            onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                            className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        ) : (
                          <div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{asset.name}</p>
                            <p className="text-xs text-gray-400 font-medium">#{asset._id.slice(-6).toUpperCase()}</p>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {editingId === asset._id ? (
                        <select 
                          value={editValues.type}
                          onChange={(e) => setEditValues({...editValues, type: e.target.value})}
                          className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          <option value="Returnable">Returnable</option>
                          <option value="Non-returnable">Non-returnable</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          asset.type === "Returnable" ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {asset.type}
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      {editingId === asset._id ? (
                        <input 
                          type="number"
                          value={editValues.quantity}
                          onChange={(e) => setEditValues({...editValues, quantity: e.target.value})}
                          className="w-20 bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${asset.quantity > 5 ? "bg-emerald-500" : "bg-red-500"}`}></div>
                          <span className="text-sm font-bold text-gray-700">{asset.quantity} In Stock</span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-xs font-bold">{new Date(asset.dateAdded).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === asset._id ? (
                          <>
                            <button 
                              onClick={() => handleSaveEdit(asset._id)}
                              className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors flex items-center justify-center"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={() => setEditingId(null)}
                              className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEditClick(asset)}
                              className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={() => handleAssetDelete(asset._id)}
                              className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Box size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No assets found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your search terms or add a new asset.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AssetList;

