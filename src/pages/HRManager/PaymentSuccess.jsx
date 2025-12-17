import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxoisSecure from "../../hooks/useAxoisSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxoisSecure();

  useEffect(() => {
    const updatePayment = async () => {
      try {
        if (sessionId) {
          const res = await axiosSecure.patch(
            `/payment-success?session_id=${sessionId}`
          );
          console.log("Payment updated:", res.data);

          
        }
      } catch (error) {
        console.error("Payment update failed:", error);
      }
    };

    updatePayment();
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
      <p className="text-lg mt-4 text-gray-600">
        Your subscription has been updated. Redirecting to Payment History...
      </p>
    </div>
  );
};

export default PaymentSuccess;
