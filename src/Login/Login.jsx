import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic(); // ✅ use axiosPublic

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await login(email, password);
      const { email: userEmail } = userCredential.user;

      // 🔐 Get JWT token from backend
      const jwtResponse = await axiosPublic.post("/jwt", {
        email: userEmail,
      });

      // 💾 Store JWT in localStorage
      localStorage.setItem("access-token", jwtResponse.data.token);

      // ✅ Show success message
      Swal.fire({
        title: "Welcome!",
        text: "Login successful.",
        icon: "success",
        confirmButtonText: "Continue",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err.message);
      setError(err.message);

      Swal.fire({
        title: "Login Failed",
        text: err.message,
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Employee Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          New here?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
