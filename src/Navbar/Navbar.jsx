import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../providers/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">EMS</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link></li>
          {user ? (
            <li>
              <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
            </li>
          ) : (
            <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 font-medium bg-blue-500">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
          {user ? (
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
          )}
        </ul>
      )}
    </nav>
  );
}
