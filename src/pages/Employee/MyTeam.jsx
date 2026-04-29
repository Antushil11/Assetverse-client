import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MapPin, 
  Briefcase,
  ChevronRight,
  ExternalLink,
  Building2,
  Calendar
} from "lucide-react";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee");
      return res.data;
    },
  });

  const companies = useMemo(() => {
    const unique = [...new Set(employees.map((e) => e.companyName))].filter(Boolean);
    return unique;
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const matchesCompany = !selectedCompany || e.companyName === selectedCompany;
      const matchesSearch = !searchTerm || 
        e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCompany && matchesSearch;
    });
  }, [employees, selectedCompany, searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Our Team</h1>
          <p className="text-gray-500 font-medium">Connect and collaborate with your colleagues across the organization.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest">
            {employees.length} Members Total
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-grow group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 flex-grow lg:flex-grow-0">
            <Building2 size={18} className="text-gray-400 ml-4 hidden lg:block" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full lg:w-64 bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-700 cursor-pointer appearance-none"
            >
              <option value="">All Organizations</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
          <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredEmployees.map((employee) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={employee._id} 
              className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group flex flex-col"
            >
              <div className="p-8 pb-4 flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-[28px] overflow-hidden border-2 border-white shadow-lg">
                    <img
                      src={employee.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.email}`}
                      alt={employee.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{employee.name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{employee.position || "Employee"}</p>
                </div>
              </div>

              <div className="p-8 pt-4 space-y-4 flex-grow">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Mail size={14} />
                    </div>
                    <span className="text-xs font-bold">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Building2 size={14} />
                    </div>
                    <span className="text-xs font-bold">{employee.companyName || "Organization"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Calendar size={14} />
                    </div>
                    <span className="text-xs font-bold">Joined {new Date(employee.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[10px] font-black text-primary">
                      +
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                    Profile <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {!isLoading && filteredEmployees.length === 0 && (
        <div className="py-32 text-center bg-white rounded-[48px] border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users size={48} className="text-gray-200" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </motion.div>
  );
};

export default MyTeam;

