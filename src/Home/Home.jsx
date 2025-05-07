import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // I Used Tailwind CSS Library for styling
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <section className="bg-blue-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EMS</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Make managing your team easier — track attendance, handle payroll, and keep everything organized in one place.
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">What Makes Our EMS Special?</h2>
        <div className="grid gap-8 md:grid-cols-3 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Employee Records</h3>
            <p>Keep track of all your team members — their roles, contact info, and work history — in one tidy database.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Attendance & Time Off</h3>
            <p>See who’s in, who’s out, and manage time-off requests without the headache.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Payroll & Reviews</h3>
            <p>Handle salaries, taxes, and performance reviews — all without switching tabs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
