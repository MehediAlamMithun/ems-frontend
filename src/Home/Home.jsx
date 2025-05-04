import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <section className="bg-blue-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EMS</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Streamline your organization's employee management — from attendance to payroll, all in one place.
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
        <h2 className="text-3xl font-semibold mb-6">Why Choose Our EMS?</h2>
        <div className="grid gap-8 md:grid-cols-3 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Employee Database</h3>
            <p>Store and manage detailed employee records including roles, history, and contact info.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Attendance & Leave</h3>
            <p>Track real-time attendance, log working hours, and manage leave applications efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Payroll & Evaluation</h3>
            <p>Automated salary calculation, tax handling, and customizable performance reviews.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
