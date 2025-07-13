// src/pages/AdminSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSuccess = () => {
  const navigate = useNavigate();

  // Redirect to the dashboard after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard"); // Assuming "/dashboard" is the route for the admin dashboard
    }, 2000); // Wait for 2 seconds before redirecting
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-5xl font-bold text-green-700 mb-6">KYC Verified Successfully!</h1>
      <p className="text-lg text-gray-700 mb-8">You have successfully verified the user's KYC documents.</p>
      <button
        onClick={() => navigate("/admin-kyc")}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg transition"
      >
        Back to KYC Requests
      </button>
    </div>
  );
};

export default AdminSuccess;