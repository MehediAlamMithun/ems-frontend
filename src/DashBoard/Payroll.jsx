import React, { useEffect, useState } from "react";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const Payroll = () => {
  const axiosPublic = UseAxiosPublic();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosPublic]);

  const handlePayrollSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUserId || !date || !amount) {
      Swal.fire("Missing Data", "Please fill in all fields", "warning");
      return;
    }

    try {
      const response = await axiosPublic.patch(`/users/${selectedUserId}`, {
        action: "updatePayroll",
        date,
        payroll: amount,
      });

      Swal.fire("Success", response.data.message || "Payroll updated", "success");
      setSelectedUserId("");
      setDate("");
      setAmount("");
    } catch (err) {
      console.error("Payroll update failed:", err);
      Swal.fire("Error", "Failed to update payroll", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🧾 Update Payroll</h2>
      <form onSubmit={handlePayrollSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Employee</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payroll Amount ($)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Payroll
        </button>
      </form>
    </div>
  );
};

export default Payroll;
