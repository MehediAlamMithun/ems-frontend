import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Register = () => {
  const { register } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic(); 
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await register(name, email, password);
      console.log("Registered:", user);
    
      const newUser = {
        name,
        email,
        role: "employee",
      };
    
      await axiosPublic.post("/users", newUser);

      Swal.fire({ title: "All set!", text: "Your account has been created.", icon: "success" });

      navigate("/login");

    } catch (err) {
      console.error("Registration error:", err.message);
      setError(err.message);

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        await currentUser.delete();
        console.warn("Deleted Firebase user due to post-creation error");
      }

      Swal.fire({
        title: "Something went wrong",
        text: err.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }; 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
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
            <label className="block text-sm font-medium mb-1">Create Password</label>
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already signed up?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
