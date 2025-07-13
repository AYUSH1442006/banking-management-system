import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Signup successful! Redirecting...');
        setTimeout(() => {
          navigate('/login'); // ✅ After signup, redirect to login page
        }, 1500);
      } else {
        setError(data.message || 'Signup failed. Try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left section (Signup Form) */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0047AB] to-[#001F5B] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12 max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="w-full bg-[#0047AB] text-white py-3 rounded-lg hover:bg-[#003B91] transition"
            >
              Sign Up
            </button>
            {error && <p className="text-center text-red-600 mt-2 text-sm">{error}</p>}
            {success && <p className="text-center text-green-600 mt-2 text-sm">{success}</p>}
          </form>
          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Right section (Visual Content) */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-white to-blue-50 px-8">
        <div className="text-center max-w-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Create Account"
            className="w-2/3 mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-[#003366]">Smart Banking Starts Here</h2>
          <p className="text-gray-700 mt-3">
            Join our digital banking platform today. Create your account and manage your finances securely, anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
