import React from "react";

const Transactions = () => {
  // Dummy data (you can replace this with real API calls later)
  const transactionData = [
    { id: 1, date: "2025-04-01", type: "Credit", amount: 1000 },
    { id: 2, date: "2025-04-02", type: "Debit", amount: 500 },
    { id: 3, date: "2025-04-03", type: "Credit", amount: 750 },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h2>Recent Transactions</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.date}</td>
              <td>{txn.type}</td>
              <td>{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;