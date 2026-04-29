import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  User as UserIcon, 
  Mail, 
  Settings2,
  ChevronRight,
  Filter,
  MoreHorizontal
} from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [], isLoading } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Admin Assigned",
          text: `${user.displayName} is now an Administrator.`,
          showConfirmButton: false,
          timer: 2000,
          background: "#fff",
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Admin Removed",
          text: `${user.displayName} role changed to Standard User.`,
          showConfirmButton: false,
          timer: 2000,
          background: "#fff",
        });
      }
    });
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">User Management</h1>
          <p className="text-gray-500 font-medium">Manage access controls and roles for your organization.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest">
            {users.length} Total Users
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Identity</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Account Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {users.map((user, index) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={user._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.email} 
                            alt="" 
                            className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-sm"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            user.role === "admin" ? "bg-primary" : "bg-gray-300"
                          }`}></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{user.displayName}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID: {user._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail size={14} />
                          <span className="text-xs font-bold">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Settings2 size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{user.role || "Standard User"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <div className={`px-4 py-1.5 rounded-xl flex items-center gap-2 ${
                          user.role === "admin" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"
                        }`}>
                          {user.role === "admin" ? <ShieldCheck size={14} /> : <UserIcon size={14} />}
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {user.role === "admin" ? "Admin" : "User"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleRemoveAdmin(user)}
                            className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors flex items-center justify-center group/btn"
                            title="Remove Admin"
                          >
                            <ShieldAlert size={18} className="group-hover/btn:rotate-12 transition-transform" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeUser(user)}
                            className="w-10 h-10 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center group/btn"
                            title="Make Admin"
                          >
                            <ShieldCheck size={18} className="group-hover/btn:scale-110 transition-transform" />
                          </button>
                        )}
                        <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors flex items-center justify-center">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {!isLoading && users.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserIcon size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No users matched</h3>
              <p className="text-gray-500 font-medium">Try search with a different name or email address.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserManagement;

