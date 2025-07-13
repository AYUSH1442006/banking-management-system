import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../animations/bank-animation.json";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Parallax } from "react-parallax";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS for scroll animations
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section with Parallax Background */}
      <Parallax
        bgImage="https://images.pexels.com/photos/30715673/pexels-photo-30715673/free-photo-of-abstract-dark-textured-wall-art-with-gold.jpeg?auto=compress&cs=tinysrgb&w=1600"
        strength={250}
        blur={{ min: 0, max: 5 }}
      >
        <div className="min-h-screen bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-lg">
            Welcome to CrownStone Bank (CSB)
          </h1>
          <p className="text-2xl md:text-3xl mt-6 text-gray-200">
            Where Luxury Meets Banking Excellence
          </p>

          {/* Crown Animation */}
          <div className="mt-12 w-72">
            <Lottie animationData={animationData} loop={true} />
          </div>

          {/* Get Started Button */}
          <a
            href="/login"
            className="mt-8 inline-block bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-500 hover:scale-105 transition duration-300 shadow-lg"
          >
            Get Started
          </a>
        </div>
      </Parallax>

      {/* About Section with Scroll Animations */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black pt-24 min-h-screen text-white p-8">
        <section data-aos="fade-up" className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-yellow-400">About CSB</h2>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            At CrownStone Bank, we redefine luxury banking. Enjoy ultra-secure services,
            personalized financial care, and a commitment to your success —
            all wrapped in sophistication and prestige.
          </p>
        </section>

        {/* Features Section with Scroll Animations */}
        <section data-aos="fade-up" className="mt-28 text-center">
          <h2 className="text-4xl font-bold text-yellow-400">Why Choose CSB?</h2>
          <ul className="mt-8 space-y-6 text-gray-300 max-w-2xl mx-auto text-lg list-disc list-inside">
            <li>Ultra-Secure Digital Banking Platform</li>
            <li>Priority Services for Premium Clients</li>
            <li>AI-Powered Financial Planning Tools</li>
            <li>24/7 Personalized Relationship Managers</li>
            <li>Exclusive Wealth Management Programs</li>
          </ul>
        </section>

        {/* Offers Section with Scroll Animations */}
        <section data-aos="fade-up" className="mt-28 text-center">
          <h2 className="text-4xl font-bold text-yellow-400">Exclusive Offers</h2>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 hover:scale-105 hover:shadow-yellow-400 transition duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Luxury Credit Cards</h3>
              <p className="text-gray-600">
                Elite rewards, priority access, and no annual fees for the first year.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 hover:scale-105 hover:shadow-yellow-400 transition duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Private Wealth Management</h3>
              <p className="text-gray-600">
                Custom investment strategies by expert advisors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 hover:scale-105 hover:shadow-yellow-400 transition duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">Home Loans at 6.5% APR</h3>
              <p className="text-gray-600">
                Live your dreams with premium housing solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-28 text-center border-t border-gray-700 pt-8 text-gray-500 text-sm">
          © 2025 CrownStone Bank (CSB). All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;