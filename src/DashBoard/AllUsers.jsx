import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);

  // Admin can assign any of these roles
  const roles = ["employee", "supervisor", "manager", "general manager", "admin"];

  useEffect(() => {
    axiosSecure.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Failed to fetch users:", err));
  }, [axiosSecure]);

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}`, {
        action: "updateRole",
        role: newRole,
      });

      if (res.status === 200) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        Swal.fire("✅ Updated", "Role updated successfully", "success");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("❌ Role update failed:", error);
      Swal.fire("❌ Error", "Could not update role", "error");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">👥 Manage User Roles</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Current Role</th>
            <th className="p-2 border">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{u.role}</td>
              <td className="p-2 border">
                <select
                  className="border p-1 rounded"
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
