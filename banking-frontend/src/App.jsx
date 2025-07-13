import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import LoginSuccess from "./pages/LoginSuccess";
import SignupSuccess from "./pages/SignupSuccess";
import KYCForm from "./components/KYCForm";
import KYCStatus from "./components/KYCStatus";
import User from "./pages/User";
import KYCVerifiedGlitch from "./components/KYCVerifiedGlitch";
import AdminKYC from "./pages/AdminKYC";
import AdminSuccess from "./pages/AdminSuccess";
import "./index.css"
import LoanApply from "./pages/LoanApply";
import LoanStatus from "./pages/LoanStatus";
import AdminLoanApproval from "./pages/AdminLoanApproval";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/success" element={<LoginSuccess />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/kyc" element={<KYCForm />} />
        <Route path="/kyc-status" element={<KYCStatus  userId={localStorage.getItem('email')}/>} />
        <Route path="/kyc-verified" element={<KYCVerifiedGlitch />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin-kyc" element={<AdminKYC/>} />
        <Route path="/admin-success" element={<AdminSuccess />} />
        <Route path="/apply-loan" element={<LoanApply />} />
        <Route path="/loan-status" element={<LoanStatus />} />
        <Route path="/admin-loan-approval" element={<AdminLoanApproval />} />

      </Routes>
    </Router>
  );
};

export default App;
