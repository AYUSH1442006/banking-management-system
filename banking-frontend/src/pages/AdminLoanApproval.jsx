import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLoanApproval = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all loan applications
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/loan-applications');
        setLoans(response.data.loans);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Approve loan
  const approveLoan = async (loanId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/approve-loan', { loanId });
      setLoans(loans.map(loan => (loan._id === loanId ? response.data : loan)));
    } catch (error) {
      console.error('Error approving loan:', error);
    }
  };

  // Reject loan
  const rejectLoan = async (loanId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/reject-loan', { loanId });
      setLoans(loans.map(loan => (loan._id === loanId ? response.data : loan)));
    } catch (error) {
      console.error('Error rejecting loan:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Admin Loan Approval Panel</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loader"></span> {/* Optional: add a loading spinner here */}
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">User Email</th>
                <th className="px-6 py-4 text-left">Loan Amount</th>
                <th className="px-6 py-4 text-left">Loan Purpose</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="border-t">
                  <td className="px-6 py-4">{loan.userId?.email || 'N/A'}</td>
                  <td className="px-6 py-4">{loan.loanAmount}</td>
                  <td className="px-6 py-4">{loan.loanPurpose}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-white rounded-full ${
                        loan.loanStatus === 'Pending' ? 'bg-yellow-500' : loan.loanStatus === 'Approved' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {loan.loanStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {loan.loanStatus === 'Pending' ? (
                      <>
                        <button
                          onClick={() => approveLoan(loan._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectLoan(loan._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLoanApproval;