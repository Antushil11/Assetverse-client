import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { 
  UserCheck, 
  UserX, 
  Trash2, 
  Search, 
  Filter, 
  Clock, 
  Calendar,
  User as UserIcon,
  Package,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: employees = [], isLoading } = useQuery({
    queryKey: ["employee", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee");
      return res.data;
    },
  });

  const updateEmployeeStatus = (employee, status) => {
    const updateInfo = { status: status, email: employee.email };
    axiosSecure.patch(`/employee/${employee._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `Request has been marked as ${status}.`,
          showConfirmButton: false,
          timer: 2000,
          background: "#fff",
        });
      }
    });
  };

  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action will permanently remove the request from the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/employee/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Request has been removed.", "success");
          }
        });
      }
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "rejected": return "bg-red-50 text-red-600 border-red-100";
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return <CheckCircle2 size={12} />;
      case "rejected": return <XCircle size={12} />;
      case "pending": return <Clock size={12} />;
      default: return <AlertCircle size={12} />;
    }
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Join Requests</h1>
          <p className="text-gray-500 font-medium">Review and manage team joining or asset allocation requests.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest">
            {employees.length} Active Requests
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Employee</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Assignment</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Timeline</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {employees.map((employe, index) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={employe._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm overflow-hidden">
                          {employe.photoURL ? (
                            <img src={employe.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <UserIcon size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{employe.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{employe.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package size={14} className="text-primary" />
                        <span className="text-xs font-bold">Standard Allocation</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{employe.workStatus || "General"}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-xs font-bold">{new Date(employe.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 ${getStatusStyle(employe.status)}`}>
                          {getStatusIcon(employe.status)}
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {employe.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {employe.status !== "approved" && (
                          <button
                            onClick={() => updateEmployeeStatus(employe, "approved")}
                            className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center group/btn"
                            title="Approve Request"
                          >
                            <UserCheck size={18} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        )}
                        {employe.status !== "rejected" && (
                          <button
                            onClick={() => updateEmployeeStatus(employe, "rejected")}
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center group/btn"
                            title="Reject Request"
                          >
                            <UserX size={18} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleAssetDelete(employe._id)}
                          className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-all flex items-center justify-center"
                          title="Delete Request"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {!isLoading && employees.length === 0 && (
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No pending requests</h3>
              <p className="text-gray-500 font-medium">All joining requests have been processed.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AllRequests;

