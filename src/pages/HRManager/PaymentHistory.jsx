import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxoisSecure from "../../hooks/useAxoisSecure";



const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxoisSecure()
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

  if (loading || !axiosSecure) return <p>Loading...</p>;

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="w-full border-collapse border border-primary">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-primary px-4 py-2">Transaction ID</th>
              <th className="border border-primary  px-4 py-2">Package</th>
              <th className="border border-primary px-4 py-2">Amount (USD)</th>
              <th className="border border-primary px-4 py-2">Employee Limit</th>
              <th className="border border-primary px-4 py-2">Status</th>
              <th className="border border-primary px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="border border-primary px-4 py-2">{payment.transactionId}</td>
                <td className="border border-primary px-4 py-2">{payment.packageName}</td>
                <td className="border border-primary px-4 py-2">{payment.amount}</td>
                <td className="border border-primary px-4 py-2">{payment.employeeLimit}</td>
                <td className="border border-primary px-4 py-2">{payment.status}</td>
                <td className="border border-primary px-4 py-2">
                  {new Date(payment.paymentDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
