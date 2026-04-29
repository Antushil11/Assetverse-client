import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Camera, 
  ShieldCheck, 
  Save,
  ArrowRight,
  Globe,
  MapPin,
  AtSign
} from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      phone: user?.phone || "",
    },
  });

  const [profilePic, setProfilePic] = useState(user?.photoURL || null);

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Updated Data:", data);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your professional profile has been successfully saved.",
        showConfirmButton: false,
        timer: 2000,
        confirmButtonColor: "#4F46E5"
      });
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  if (!user) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">My Profile</h1>
        <p className="text-gray-500 font-medium">Manage your personal information and account security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - User Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            
            <div className="relative pt-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.email}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute -right-2 -bottom-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                  <Camera size={18} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-1">{user.displayName}</h2>
              <div className="flex items-center gap-2 text-primary mb-6">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Professional</span>
              </div>

              <div className="w-full space-y-3 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-gray-500">
                  <AtSign size={16} />
                  <span className="text-sm font-bold">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Building2 size={16} />
                  <span className="text-sm font-bold">{user.company || "Company Pending"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-100">
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              <Globe size={20} /> Presence
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-2xl">
                <span className="text-xs font-bold text-indigo-100 uppercase tracking-widest">Efficiency</span>
                <span className="text-sm font-black">94%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-2xl">
                <span className="text-xs font-bold text-indigo-100 uppercase tracking-widest">Reliability</span>
                <span className="text-sm font-black">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Email (Read Only) */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Mail size={14} /> Primary Email
                  </label>
                  <div className="w-full bg-gray-100 border-0 rounded-2xl px-6 py-4 font-bold text-gray-500 cursor-not-allowed flex items-center justify-between">
                    <span>{user.email}</span>
                    <ShieldCheck size={18} className="text-emerald-500" />
                  </div>
                </div>

                {/* Company (Read Only) */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Building2 size={14} /> Organization
                  </label>
                  <div className="w-full bg-gray-100 border-0 rounded-2xl px-6 py-4 font-bold text-gray-500 cursor-not-allowed">
                    {user.company || "Not Linked"}
                  </div>
                </div>
              </div>

              {/* Extra Info */}
              <div className="pt-8 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </label>
                  <input
                    defaultValue="San Francisco, CA"
                    className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Globe size={14} /> Timezone
                  </label>
                  <select className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 appearance-none">
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT+00:00) UTC</option>
                    <option>(GMT+06:00) Dhaka</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white"></div>
              ) : (
                <>
                  <Save size={20} /> Update Professional Profile <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;

