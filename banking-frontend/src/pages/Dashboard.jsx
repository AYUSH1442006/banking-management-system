import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import KYCVerifiedGlitch from "../components/KYCVerifiedGlitch";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${email}`);
        setBalance(response.data?.balance || 0);
        setTransactions(response.data?.transactions || []);
        setKycStatus(response.data?.kycStatus || "");

        const loanResponse = await axios.get(`http://localhost:5000/api/loan/myloans/${email}`);
        setLoans(loanResponse.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data");
      }
    };

    fetchUserData();
  }, [email, navigate]);

  const handleTransaction = async (type) => {
    setError("");
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const endpoint = type === "deposit" ? "/api/deposit" : "/api/withdraw";
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        amount: parseFloat(amount),
      });

      setBalance(response.data?.balance || 0);
      setTransactions(response.data?.transactions || []);
      setAmount("");
    } catch (err) {
      console.error("Transaction error:", err.response ? err.response.data : err);
      setError(err.response?.data?.message || "Transaction failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dashboard Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0047AB] to-[#001F5B] flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md overflow-y-auto max-h-screen">
          <h2 className="text-xl font-semibold text-[#0047AB] mb-4">
            Welcome, {email}
          </h2>
          <h3 className="text-lg mb-4 text-gray-800">
            Balance: ₹{balance.toFixed(2)}
          </h3>

          {/* KYC Verified Animation */}
          {kycStatus === "verified" && <KYCVerifiedGlitch />}

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleTransaction("deposit")}
              className="w-full bg-[#007b5e] text-white py-2 rounded-lg hover:bg-[#00614b] transition"
            >
              Deposit
            </button>
            <button
              onClick={() => handleTransaction("withdraw")}
              className="w-full bg-[#d90429] text-white py-2 rounded-lg hover:bg-[#a90322] transition"
            >
              Withdraw
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Transaction History
          </h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 mb-4">No transactions yet.</p>
          ) : (
            <div className="max-h-40 overflow-y-auto mb-6">
              <ul className="space-y-2">
                {transactions.map((tx, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-lg shadow-sm border-l-4 ${
                      tx.type === "deposit"
                        ? "border-green-500"
                        : "border-red-500"
                    } bg-gray-100`}
                  >
                    <strong>[{tx.type.toUpperCase()}]</strong> ₹{tx.amount} —{" "}
                    <span className="text-sm text-gray-600">
                      {new Date(tx.date).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* === Loan Section START === */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">My Loan Applications</h3>
          {loans.length === 0 ? (
            <p className="text-gray-500 mb-4">No loans applied yet.</p>
          ) : (
            <div className="max-h-40 overflow-y-auto mb-6">
              <ul className="space-y-2">
                {loans.map((loan, index) => (
                  <li
                    key={index}
                    className="p-3 rounded-lg shadow-sm border-l-4 border-blue-500 bg-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <strong>₹{loan.loanAmount}</strong> — {loan.loanPurpose}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          loan.loanStatus === "Approved"
                            ? "bg-green-100 text-green-800"
                            : loan.loanStatus === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {loan.loanStatus}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Applied on: {new Date(loan.appliedAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* === Loan Section END === */}

          {/* Apply for Loan Button */}
          <Link to="/apply-loan">
            <button className="mt-4 w-full bg-[#0047AB] text-white py-3 rounded-lg hover:bg-[#003B91] transition">
              Apply for Loan
            </button>
          </Link>

          {/* KYC Button */}
          <Link to="/kyc">
            <button className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
              Complete / Check KYC
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-[#0047AB] text-white py-3 rounded-lg hover:bg-[#003B91] transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Visual Panel */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-white px-8">
        <div className="text-center max-w-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1087/1087929.png"
            alt="Banking Illustration"
            className="w-2/3 mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-[#003366]">
            Your Smart Bank Dashboard
          </h2>
          <p className="text-gray-700 mt-3">
            Easily manage your money, make secure transactions, and stay updated
            with your activity — all in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
