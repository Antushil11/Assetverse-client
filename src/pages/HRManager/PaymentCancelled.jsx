import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="text-center">
      <h2>Payment is Cancelled. Plaese try agin</h2>
      <Link to="/HR-Manager/Upgrade-Package">
      <button className="btn btn-primary">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
