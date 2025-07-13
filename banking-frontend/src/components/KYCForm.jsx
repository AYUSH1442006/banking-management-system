import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    documentType: "",
    documentNumber: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/submit-kyc", {
        ...formData,
        email,
      });

      setMessage("KYC submitted successfully!");
      
      // Redirect after short delay
      setTimeout(() => {
        navigate("/kyc-status");
      }, 1000);
    } catch (error) {
      console.error("KYC submission error:", error);
      setMessage("Failed to submit KYC. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600">KYC Verification</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Document Type</option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
          <option value="Passport">Passport</option>
        </select>

        <input
          type="text"
          name="documentNumber"
          placeholder="Document Number"
          value={formData.documentNumber}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Submit KYC
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default KYCForm;