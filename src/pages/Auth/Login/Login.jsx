import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../SocalLogin/SocalLogin";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);
      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center lg:text-left">
        <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h3>
        <p className="text-gray-500 font-medium italic">"The best way to predict the future is to create it."</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                placeholder="name@company.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-bold ml-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
              <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
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
            {errors.password && (
              <p className="text-red-500 text-xs font-bold ml-1">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>Sign In <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative px-4 bg-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">or continue with</span>
        </div>

        <SocalLogin />
      </div>

      <p className="text-center text-sm font-medium text-gray-500">
        New to AssetVerse?{" "}
        <Link 
          state={location.state} 
          to="/register" 
          className="text-primary font-black hover:underline underline-offset-4"
        >
          Create Employee Account
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

export default Login;

