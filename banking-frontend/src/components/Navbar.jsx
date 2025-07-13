import { FaCrown } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-900 shadow-lg p-4 fixed w-full z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-white text-2xl font-bold">
          <FaCrown className="text-yellow-400 text-3xl transition-transform duration-300 ease-in-out hover:scale-110" />
          <span className="transition-all duration-300 ease-in-out hover:text-yellow-400">CrownStone Bank</span>
        </div>
        <ul className="flex space-x-6 text-white text-lg">
          <li className="hover:text-yellow-400 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
            Home
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
            About
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
            Services
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;