// components/KYCVerifiedGlitch.js
import React from 'react';

const KYCVerifiedGlitch = () => {
  return (
    <div className="p-6 mt-10 bg-black rounded-lg shadow-xl border border-pink-500 text-center">
      <h2 className="text-4xl glitch uppercase tracking-wider text-cyan-300">
        KYC Verified
      </h2>
      <p className="text-pink-400 mt-2 text-sm">
        You're now officially verified! Enjoy full access.
      </p>
    </div>
  );
};

export default KYCVerifiedGlitch;