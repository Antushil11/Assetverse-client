import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import PaymentHistory from "./PaymentHistory";


const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxoisSecure();

  const packages = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      features: [
        "All Standard features",
        "Custom Branding",
        "24/7 Support",
      ],
    },
  ];

  const handlePurchase = async (pack) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        hrEmail: user.email,
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Upgrade Your Package
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {packages.map((pack, index) => (
          <div
            key={index}
            className="border rounded-xl shadow p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">{pack.name}</h2>

            <p className="text-gray-600 mb-2">
              Employee Limit: <strong>{pack.employeeLimit}</strong>
            </p>

            <p className="text-3xl font-bold mb-4">${pack.price} / month</p>

            <ul className="space-y-2 mb-6">
              {pack.features.map((feature, i) => (
                <li key={i} className="text-sm">
                  • {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(pack)}
              className="btn btn-primary w-full text-white"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      <div>
        <PaymentHistory></PaymentHistory>
      </div>
    </div>
  );
};

export default UpgradePackage;
