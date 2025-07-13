import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("🚀 Attempting login for", email);
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log("⏳ Response status:", res.status);
      const data = await res.json();
      console.log("📥 Response JSON:", data);

      if (res.ok) {
        // store both token & email from server response
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.email);
        console.log("✅ Login OK, redirecting to /dashboard");
        navigate('/dashboard');
      } else {
        console.warn("❌ Login failed:", data.message);
        setError(data.message || 'Login failed. Try again.');
      }
    } catch (err) {
      console.error("🔥 Login error:", err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Login Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0047AB] to-[#001F5B] flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-semibold text-[#003366] text-center mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            {error && (
              <p className="text-center text-red-600 mt-2 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#0047AB] text-white py-3 rounded-lg hover:bg-[#003B91] transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-700">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Right Visual Panel */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-white px-8">
        <div className="text-center max-w-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Secure Banking"
            className="w-2/3 mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-[#003366]">
            Secure & Smart Banking
          </h2>
          <p className="text-gray-700 mt-3">
            Manage your account, transfer funds, and view transactions – all in one place. Safe, fast, and convenient banking at your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
