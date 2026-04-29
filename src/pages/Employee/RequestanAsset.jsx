import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Layers, 
  Hash, 
  Search, 
  Plus, 
  Filter, 
  ArrowRight,
  Building2,
  CheckCircle2,
  X,
  Send,
  Loader2,
  Box
} from "lucide-react";

const RequestanAsset = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: parcels = [], refetch, isLoading } = useQuery({
    queryKey: ["parcels", "completed"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?status=completed");
      return res.data;
    },
  });

  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
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
          riderModalRef.current.close();
          refetch();
          Swal.fire({
            icon: "success",
            title: "Request Submitted",
            text: `Asset request has been sent to ${user.displayName}.`,
            showConfirmButton: false,
            timer: 2000,
            background: "#fff",
          });
        }
      });
  };

  const filteredParcels = parcels.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Request Assets</h1>
          <p className="text-gray-500 font-medium">Browse available company inventory and submit allocation requests.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest">
            {parcels.length} Items Available
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for laptops, monitors, office gear..."
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

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredParcels.map((parcel) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={parcel._id} 
              className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={parcel.image} 
                  alt={parcel.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
                    parcel.type === "Returnable" ? "bg-indigo-600/80 text-white" : "bg-amber-500/80 text-white"
                  }`}>
                    {parcel.type}
                  </span>
                </div>
                {parcel.availableQuantity < 5 && (
                  <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter backdrop-blur-sm">
                    Low Stock
                  </div>
                )}
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{parcel.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Layers size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">{parcel.type} Asset</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <Hash size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Available</p>
                      <p className="text-sm font-black text-gray-900">{parcel.availableQuantity} Units</p>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className={parcel.availableQuantity > 0 ? "text-emerald-500" : "text-gray-300"} />
                </div>

                <button
                  onClick={() => openAssignRiderModel(parcel)}
                  disabled={parcel.availableQuantity === 0}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Request Asset <Send size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {!isLoading && filteredParcels.length === 0 && (
        <div className="py-32 text-center bg-white rounded-[48px] border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Box size={48} className="text-gray-200" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 font-medium">We couldn't find any assets matching your search criteria.</p>
        </div>
      )}

      {/* Modal Redesign */}
      <dialog ref={riderModalRef} className="modal backdrop-blur-md">
        <div className="modal-box max-w-2xl bg-white rounded-[40px] p-0 overflow-hidden shadow-2xl border border-gray-100">
          <div className="bg-primary p-8 text-white relative">
            <button 
              onClick={() => riderModalRef.current.close()}
              className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
              <Building2 size={28} /> Confirm Request
            </h3>
            <p className="text-primary-foreground/80 font-medium">Select a company representative to process your request for <strong>{selectedParcel?.name}</strong>.</p>
          </div>

          <div className="p-8">
            <div className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Representative</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-white transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 text-sm">{user.displayName}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleAssignUser(user)}
                          className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-black transition-all"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {isLoadingUsers && (
                    <tr>
                      <td colSpan="3" className="px-6 py-10 text-center">
                        <Loader2 className="animate-spin mx-auto text-primary" size={24} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 flex justify-end">
              <form method="dialog">
                <button className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default RequestanAsset;

