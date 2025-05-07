import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // I Used Tailwind CSS Library for styling
  return (
    <footer className="bg-blue-600 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About EMS</h3>
          <p className="text-sm">
            EMS is a modern Employee Management System designed to digitize HR
            operations, boost efficiency, and simplify workforce management.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@ems-demo.com</p>
          <p className="text-sm">Phone: +880-123-456-7890</p>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} EMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
