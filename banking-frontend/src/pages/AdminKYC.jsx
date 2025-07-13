import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminKYC = () => {
  const [kycRequests, setKycRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKycRequests();
  }, []);

  const fetchKycRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/get-kyc-requests");
      setKycRequests(response.data);
    } catch (error) {
      toast.error("Failed to fetch KYC requests.");
      console.error("Error fetching KYC requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    const confirmAction = window.confirm(
      `Are you sure you want to mark this request as '${newStatus}'?`
    );
    if (!confirmAction) return;

    try {
      setUpdatingUserId(userId);
      await axios.put(`http://localhost:5000/update-kyc-status/${userId}`, {
        status: newStatus,
      });

      setKycRequests((prev) =>
        prev.map((req) =>
          req._id === userId ? { ...req, status: newStatus } : req
        )
      );

      toast.success(`KYC has been successfully ${newStatus.toLowerCase()}.`);

      if (newStatus === "Verified") {
        setTimeout(() => {
          navigate("/admin-success");
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      toast.error("Failed to update KYC status.");
      console.error("Error updating KYC status:", error);
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-center" />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          KYC Requests
        </h1>

        {loading ? (
          <p className="text-center text-blue-500 font-semibold">
            Loading requests...
          </p>
        ) : kycRequests.length === 0 ? (
          <p className="text-center text-gray-500">No KYC requests available.</p>
        ) : (
          kycRequests.map((request) => (
            <div
              key={request._id}
              className="border rounded-md p-6 mb-6 shadow-sm bg-gray-50"
            >
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {request.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span> {request.address}
              </p>
              <p className="mb-2">
                <span className="font-semibold">PAN:</span> {request.pan}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Aadhar:</span> {request.aadhar}
              </p>
              <p className="mb-2">
                <span className="font-semibold">ID Proof:</span>{" "}
                <a
                  href={request.idProofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </p>
              {/* Optional createdAt */}
              {request.createdAt && (
                <p className="mb-2">
                  <span className="font-semibold">Requested On:</span>{" "}
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
              )}
              <p className="mb-4">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`font-semibold px-2 py-1 rounded ${
                    request.status === "Verified"
                      ? "bg-green-200 text-green-700"
                      : request.status === "Rejected"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {request.status === "Pending" ? "Under Review" : request.status}
                </span>
              </p>

              {request.status === "Pending" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleStatusChange(request._id, "Verified")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    disabled={updatingUserId === request._id}
                  >
                    {updatingUserId === request._id ? "Verifying..." : "Verify"}
                  </button>
                  <button
                    onClick={() => handleStatusChange(request._id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    disabled={updatingUserId === request._id}
                  >
                    {updatingUserId === request._id ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminKYC;
