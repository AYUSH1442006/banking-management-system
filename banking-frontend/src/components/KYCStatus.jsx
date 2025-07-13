import React, { useEffect, useState } from "react";
import axios from "axios";
import KYCStepper from "./KYCStepper";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom"; // For navigation

const steps = ["KYC Form Submitted", "KYC Under Review", "KYC Verified", "KYC Rejected"];

const KYCStatus = ({ userId }) => {
  const [status, setStatus] = useState("Loading...");
  const [currentStep, setCurrentStep] = useState(0);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;

    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/kyc-status/${userId}`);
        const userStatus = res.data.status;
        setStatus(userStatus);

        if (userStatus === "Pending") setCurrentStep(1);
        else if (userStatus === "Verified") setCurrentStep(2);
        else if (userStatus === "Rejected") setCurrentStep(3);
        else setCurrentStep(0);
      } catch (error) {
        console.error("Error fetching KYC status:", error);
        setStatus("Error fetching status");
      }
    };

    if (userId) {
      fetchStatus();
      // Auto-refresh every 5 seconds
      intervalId = setInterval(fetchStatus, 5000);
    } else {
      setStatus("User ID not provided");
    }

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  const handleNavigateToAdmin = () => {
    navigate("/admin-kyc"); // Redirect to Admin KYC page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">KYC Status Tracker</h2>

      <div className="mb-8 p-4 bg-white rounded shadow-md w-full max-w-md text-center">
        <p className="text-lg">
          <strong>Current Status:</strong> {status}
        </p>
      </div>

      <KYCStepper steps={steps} currentStep={currentStep} />

      {/* Confetti when KYC is Verified */}
      {currentStep === 2 && (
        <Confetti width={width} height={height} numberOfPieces={300} />
      )}

      {/* Admin KYC Redirect Button */}
      <button
        onClick={handleNavigateToAdmin}
        className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md"
      >
        Go to Admin KYC Page
      </button>
    </div>
  );
};

export default KYCStatus;
