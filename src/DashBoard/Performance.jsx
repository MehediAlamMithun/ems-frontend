import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Performance = () => {
  const axiosPublic = UseAxiosPublic();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState(""); // ✅ You missed this
  const [score, setScore] = useState("");

  useEffect(() => {
    axiosPublic.get("/users").then((res) => setUsers(res.data));
  }, [axiosPublic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !date || score === "") {
      return Swal.fire("Incomplete", "All fields are required", "warning");
    }

    try {
      await axiosPublic.patch(`/users/${userId}/performance`, {
        date,
        score: parseInt(score),
      });

      Swal.fire("Success", "Performance score updated", "success");
      setUserId("");
      setDate("");
      setScore("");
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        📈 Update Performance Points
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Employee</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name || u.email}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          min="0"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Score (e.g. 80)"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Performance;
