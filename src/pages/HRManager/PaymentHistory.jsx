import React, { useEffect, useState } from "react";
import useAxoisSecure from "../../hooks/useAxoisSecure";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxoisSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get("/payments"); // Fetch all payments
        setPayments(res.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">HR Email</th>
              <th className="border px-4 py-2">Package</th>
              <th className="border px-4 py-2">Amount (USD)</th>
              <th className="border px-4 py-2">Employees Limit</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={`${payment.transactionId}-${index}`}>
                <td className="border px-4 py-2">{payment.hrEmail}</td>
                <td className="border px-4 py-2">{payment.packageName}</td>
                <td className="border px-4 py-2">{payment.amount}</td>
                <td className="border px-4 py-2">{payment.employeeLimit}</td>
                <td className="border px-4 py-2">
                  {new Date(payment.paymentDate).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
