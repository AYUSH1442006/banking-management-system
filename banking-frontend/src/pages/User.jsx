import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const userId = 'YOUR_USER_ID_HERE'; // Replace with auth user ID or fetch from context/state
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [transactions, setTransactions] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}/transactions`);
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(`http://localhost:5000/user/${userId}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      setEditMode(false);
      fetchUser();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(`http://localhost:5000/user/${userId}/password`, passwords);
      setPasswords({ oldPassword: '', newPassword: '' });
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to change password');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTransactions();
  }, []);

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>

      <div className="bg-gray-900 p-6 rounded shadow-lg mb-6">
        {editMode ? (
          <>
            <input
              className="block w-full mb-2 p-2 rounded text-black"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              className="block w-full mb-2 p-2 rounded text-black"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              className="block w-full mb-2 p-2 rounded text-black"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
            <button className="bg-green-600 px-4 py-2 rounded" onClick={updateProfile}>
              Save
            </button>
            <button className="ml-2 text-red-500" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Account Number:</strong> {user.accountNumber}</p>
            <p><strong>KYC Status:</strong> {user.kycStatus}</p>
            <button className="mt-3 bg-yellow-600 px-4 py-2 rounded" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded shadow-lg mb-6">
        <h3 className="text-xl mb-3">Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          className="block w-full mb-2 p-2 rounded text-black"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          className="block w-full mb-2 p-2 rounded text-black"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />
        <button className="bg-blue-700 px-4 py-2 rounded" onClick={updatePassword}>
          Change Password
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded shadow-lg">
        <h3 className="text-xl mb-3">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((txn) => (
              <li key={txn._id} className="border-b border-gray-600 pb-2">
                <p><strong>Type:</strong> {txn.type}</p>
                <p><strong>Amount:</strong> ₹{txn.amount}</p>
                <p><strong>Status:</strong> {txn.status}</p>
                <p><strong>Date:</strong> {new Date(txn.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default User;
