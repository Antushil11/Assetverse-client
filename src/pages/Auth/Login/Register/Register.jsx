import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../../SocalLogin/SocalLogin";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Calendar, 
  ArrowRight, 
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];
      if (!profileImg) return;

      // 1. Register with Firebase
      await registerUser(data.email, data.password);

      // 2. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const res = await axios.post(image_API_URL, formData);
      const photoURL = res.data.data.url;

      // 3. Save to MongoDB
      const employeeInfo = {
        name: data.name,
        email: data.email,
        photoURL,
        role: "employee",
        dateOfBirth: data.dateOfBirth
      };
      await axiosSecure.post("/employee", employeeInfo);

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        role: "employee"
      };
      await axiosSecure.post("/users", userInfo);

      // 4. Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      navigate(location.state || "/");
    } catch (err) {
      console.error("Register error:", err);
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
        <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Create Account</h3>
        <p className="text-gray-500 font-medium italic">Join our professional asset management ecosystem.</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit(handleRegistration)}>
          
          {/* Avatar Upload Preview */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-gray-50 shadow-md bg-gray-50 flex items-center justify-center">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="text-gray-300" size={32} />
                )}
              </div>
              <label className="absolute -right-2 -bottom-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <Plus size={20} />
                <input
                  type="file"
                  {...register("photo", { required: "Photo is required" })}
                  onChange={(e) => {
                    onImageChange(e);
                    register("photo").onChange(e);
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Professional Photo</p>
            {errors.photo && <p className="text-red-500 text-[10px] font-bold">{errors.photo.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name.message}</p>}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Birth Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="date"
                  {...register("dateOfBirth", { required: "Birth date is required" })}
                  className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                />
              </div>
              {errors.dateOfBirth && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.dateOfBirth.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                })}
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
                placeholder="john@company.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
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
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>Create Employee Account <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative px-4 bg-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">or register with</span>
        </div>

        <SocalLogin />
      </div>

      <p className="text-center text-sm font-medium text-gray-500 pb-10">
        Already have an account?{" "}
        <Link state={location.state} to="/login" className="text-primary font-black hover:underline underline-offset-4">
          Sign In Here
        </Link>
      </p>

      <div className="text-center">
        <Link 
          to="/Hrregister" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Join as HR Manager <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;

