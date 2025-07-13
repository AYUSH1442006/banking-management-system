import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoanApply = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleLoanSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!loanAmount || !loanPurpose) {
      setFormError("Please fill in all fields.");
      return;
    }

    // Ensure loan amount is a valid number
    if (isNaN(loanAmount) || loanAmount <= 0) {
      setFormError("Please enter a valid loan amount.");
      return;
    }

    try {
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("http://localhost:5000/api/loan/apply", {
        email,
        loanAmount: parseFloat(loanAmount),
        loanPurpose,
      });

      if (response.status === 200) {
        // If successfully applied, go to loan-status page
        navigate("/loan-status");
      } else {
        setFormError("Loan application failed. Please try again.");
      }
    } catch (err) {
      console.error("Loan application error:", err);
      setFormError("Loan application failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Apply for Loan</h3>

        {formError && <p className="text-red-600 text-sm mb-4">{formError}</p>}

        <form onSubmit={handleLoanSubmit}>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-gray-700">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="loanPurpose" className="block text-gray-700">Loan Purpose</label>
            <input
              type="text"
              id="loanPurpose"
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter purpose of loan"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApply;