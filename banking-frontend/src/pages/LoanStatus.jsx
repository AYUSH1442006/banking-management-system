import React, { useEffect, useState } from "react";
import axios from "axios";

const LoanStatus = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.get(`http://localhost:5000/api/loan/status?email=${email}`);
        if (response.data.success) {
          setLoans(response.data.loans);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Fetch loan status error:", err);
        setError("Failed to fetch loan status");
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Loan Applications</h1>
      {error && <p className="text-red-500">{error}</p>}

      {loans.length > 0 ? (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Loan Amount</th>
                <th className="p-2">Purpose</th>
                <th className="p-2">Status</th>
                <th className="p-2">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{loan.loanAmount}</td>
                  <td className="p-2">{loan.loanPurpose}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        loan.loanStatus === "Pending" ? "bg-yellow-500" :
                        loan.loanStatus === "Approved" ? "bg-green-500" :
                        "bg-red-500"
                      }`}
                    >
                      {loan.loanStatus}
                    </span>
                  </td>
                  <td className="p-2">{new Date(loan.appliedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p>No loan applications found.</p>
      )}
    </div>
  );
};

export default LoanStatus;
