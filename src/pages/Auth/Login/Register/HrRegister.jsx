import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../../SocalLogin/SocalLogin";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Lock, 
  Camera, 
  Calendar, 
  ArrowRight, 
  Loader2,
  Eye,
  EyeOff,
  User,
  Zap,
  Sparkles,
  Crown
} from "lucide-react";

const HrRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { registerUser, updateUserProfile } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistrationHr = async (data) => {
    try {
      const profileImg = data.photo[0];
      if (!profileImg) return;

      // 1. Register with Firebase
      const result = await registerUser(data.email, data.password);

      // 2. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const res = await axios.post(image_API_URL, formData);
      const photoURL = res.data.data.url;

      // 3. Save User to DB
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
        role: "hr",
        companyName: data.companyname,
        package: data.package
      };
      await axiosSecure.post("/users", userInfo);

      // 4. Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      navigate(location.state || "/");
    } catch (error) {
      console.error(error);
    }
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center lg:text-left">
        <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Corporate Portal</h3>
        <p className="text-gray-500 font-medium italic">Empower your team with high-performance asset management.</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit(handleRegistrationHr)}>
          
          {/* Company Logo Upload */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-gray-50 shadow-md bg-gray-50 flex items-center justify-center">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="text-gray-300" size={32} />
                )}
              </div>
              <label className="absolute -right-2 -bottom-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <Camera size={20} />
                <input
                  type="file"
                  {...register("photo", { required: "Company logo is required" })}
                  onChange={(e) => {
                    onImageChange(e);
                    register("photo").onChange(e);
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Company Logo</p>
            {errors.photo && <p className="text-red-500 text-[10px] font-bold">{errors.photo.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HR Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Manager Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                  placeholder="Manager Full Name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name.message}</p>}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Organization</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  {...register("companyname", { required: "Company name is required" })}
                  className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                  placeholder="Enterprise LLC"
                />
              </div>
              {errors.companyname && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.companyname.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                  placeholder="hr@company.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* Select Plan */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Initial Plan</label>
              <div className="relative group">
                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <select
                  {...register("package", { required: "Please select a plan" })}
                  className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                >
                  <option value="5">Starter (5 Members)</option>
                  <option value="10">Pro (10 Members)</option>
                  <option value="20">Elite (20 Members)</option>
                </select>
              </div>
              {errors.package && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.package.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                  pattern: { 
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=<>])[A-Za-z\d@$!%*?&^#()_\-+=<>]{8,}$/,
                    message: "Complexity required"
                  }
                })}
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>Register as HR Manager <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative px-4 bg-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">or sign up with</span>
        </div>

        <SocalLogin />
      </div>

      <p className="text-center text-sm font-medium text-gray-500 pb-10">
        Already registered?{" "}
        <Link state={location.state} to="/login" className="text-primary font-black hover:underline underline-offset-4">
          Sign In Here
        </Link>
      </p>

      <div className="text-center">
        <Link 
          to="/register" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Join as Employee <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default HrRegister;

