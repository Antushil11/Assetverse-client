import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  ArrowRight
} from "lucide-react";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user || !axiosSecure) return;

      try {
        const res = await axiosSecure.get("/payments", {
          params: { email: user.email },
        });
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      }
    };

    if (!loading) fetchPayments();
  }, [user, loading, axiosSecure]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "succeeded":
      case "completed":
      case "success": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-red-50 text-red-600 border-red-100";
    }
  };

  if (loading || !axiosSecure) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Billing History</h1>
          <p className="text-gray-500 font-medium">Track your subscription payments and transaction receipts.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-100 text-gray-900 px-6 py-3.5 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by transaction ID..."
            className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Transaction Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Plan</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {payments.map((payment) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={payment._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 font-mono">{payment.transactionId}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ref: {payment._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-bold text-gray-700">{payment.packageName}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{payment.employeeLimit} Employee Limit</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1 text-gray-900">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span className="text-sm font-black">{payment.amount}</span>
                        <span className="text-[10px] font-bold text-gray-400 ml-1 uppercase">USD</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 ${getStatusStyle(payment.status)}`}>
                          {payment.status === "succeeded" || payment.status === "success" ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 text-gray-900 text-xs font-bold">
                          <Calendar size={12} className="text-primary" />
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </div>
                        <span className="text-[10px] font-medium text-gray-400 mt-1">
                          {new Date(payment.paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {payments.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <History size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500 font-medium">Your subscription history will appear here once you make a purchase.</p>
              <button className="mt-8 text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                Upgrade Package <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentHistory;

