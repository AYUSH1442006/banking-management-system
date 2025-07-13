import React, { useState } from "react";

const Transfer = () => {
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to send this data to backend here
    console.log("Transfer Initiated:", formData);
    alert("Transfer successful!");
    setFormData({ fromAccount: "", toAccount: "", amount: "" });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Money Transfer</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>From Account:</label>
          <input
            type="text"
            name="fromAccount"
            value={formData.fromAccount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>To Account:</label>
          <input
            type="text"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Amount (₹):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Transfer
        </button>
      </form>
    </div>
  );
};

export default Transfer;