import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  ShieldCheck, 
  Users as UsersIcon,
  CreditCard,
  ArrowRight
} from "lucide-react";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const packages = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      description: "Ideal for small startups beginning their journey.",
      icon: Zap,
      color: "blue",
      features: ["Asset Tracking", "Employee Management", "Basic Support", "Email Notifications"],
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      description: "Best for growing teams with more assets.",
      icon: Sparkles,
      color: "primary",
      popular: true,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
        "Bulk Asset Import",
        "Custom PDF Reports"
      ],
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      description: "Full-scale solution for larger organizations.",
      icon: Crown,
      color: "indigo",
      features: [
        "All Standard features",
        "Custom Branding",
        "24/7 Support",
        "API Access",
        "Unlimited History Storage"
      ],
    },
  ];

  const handlePurchase = async (pack) => {
    if (!user) {
      // Handle guest state - maybe redirect to login or show message
      return window.location.assign("/login");
    }

    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        hrEmail: user?.email,
        packageName: pack.name,
        price: pack.price,
        employeeLimit: pack.employeeLimit,
      });
      window.location.assign(res.data.url);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-12"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
          <ShieldCheck size={14} /> Account Subscription
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
          Scalable Plans for <span className="text-primary">Every Team</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Choose the plan that fits your current needs. You can upgrade anytime as your organization expands.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {packages.map((pack, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-[48px] p-8 border ${
              pack.popular ? "border-primary shadow-2xl shadow-primary/10" : "border-gray-100 shadow-sm"
            } flex flex-col group hover:shadow-xl transition-all duration-500`}
          >
            {pack.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className={`w-14 h-14 rounded-2xl ${
                pack.name === "Standard" ? "bg-primary/10 text-primary" : 
                pack.name === "Premium" ? "bg-indigo-50 text-indigo-600" : "bg-blue-50 text-blue-600"
              } flex items-center justify-center mb-6`}>
                <pack.icon size={28} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{pack.name}</h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {pack.description}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">${pack.price}</span>
                <span className="text-gray-400 font-bold">/month</span>
              </div>
              <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs font-black uppercase tracking-widest">
                <UsersIcon size={14} className="text-primary" />
                Up to {pack.employeeLimit} Employees
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {pack.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Check size={12} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(pack)}
              className={`w-full py-5 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 ${
                pack.popular 
                  ? "bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40" 
                  : "bg-gray-900 text-white hover:bg-black"
              } hover:-translate-y-1 active:scale-95`}
            >
              <CreditCard size={20} /> Choose Plan <ArrowRight size={20} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="pt-12 text-center">
        <div className="inline-flex items-center gap-6 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-gray-900">Joined by 2,000+ companies</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure payments via Stripe</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpgradePackage;

