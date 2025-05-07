import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get("/users").then((res) => {
        const foundUser = res.data.find((u) => u.email === user.email);
        setUserData(foundUser);
      });
    }
  }, [user, axiosPublic]);

  const refreshData = async () => {
    const res = await axiosPublic.get("/users");
    const updated = res.data.find((u) => u.email === user.email);
    setUserData(updated);
  };

  const getPerformanceScore = (date) => {
    const match = userData.performance?.find((entry) => entry.date === date);
    return match ? match.score : "—";
  };

  const handleReset = async (type, date) => {
    const confirm = await Swal.fire({
      icon: "question",
      title: `Reset ${type}?`,
      text: `Are you sure you want to reset ${type} for ${date}?`,
      showCancelButton: true,
      confirmButtonText: "Yes, reset it",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosPublic.patch(`/users/${userData._id}/${type}/reset`, { date });
      refreshData();
    } catch {
      Swal.fire("Error", `Failed to reset ${type}`, "error");
    }
  };

  const handleDeleteRow = async (date) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete Entry",
      text: `Delete attendance and performance for ${date}?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosPublic.patch(`/users/${userData._id}/attendance/delete`, {
        date,
      });
      refreshData();
    } catch {
      Swal.fire("Error", "Failed to delete entry", "error");
    }
  };

  if (!userData) return <p className="p-4">Loading profile...</p>;
  // I Used Tailwind CSS Library for styling
  return (
    <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded shadow">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Welcome back, {userData.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-600">Here’s your weekly HR summary 👇</p>
      </div>

      <div className="space-y-3 text-sm md:text-base mb-6">
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Employee ID:</strong> {userData.employeeId}
        </p>
        <p>
          <strong>Role:</strong> {userData.role}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-2">📅 Weekly Attendance</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Day</th>
              <th className="p-2 border">Clock In</th>
              <th className="p-2 border">Clock Out</th>
              <th className="p-2 border">Payroll ($)</th>
              <th className="p-2 border">Communication (0–10)</th>
              <th className="p-2 border">Performance (0–10)</th>
              {userData.role === "admin" && (
                <th className="p-2 border text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {[...(userData.attendance || [])].reverse().map((day, index) => (
              <tr key={index} className="border-b hover:bg-blue-50">
                <td className="p-2 border">{day.date || "—"}</td>
                <td className="p-2 border">{day.weekDay || "—"}</td>
                <td className="p-2 border">{day.clockIn || "—"}</td>
                <td className="p-2 border">{day.clockOut || "—"}</td>

                {/* Payroll */}
                <td className="p-2 border">
                  <div className="flex justify-between items-center">
                    <span>{day.payroll || "—"}</span>
                    {userData.role === "admin" && (
                      <button
                        onClick={() => handleReset("payroll", day.date)}
                        className="text-red-500 ml-2"
                        title="Reset Payroll"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                </td>

                {/* Communication */}
                <td className="p-2 border">
                  <div className="flex justify-between items-center">
                    <span>{day.communicationRating ?? "—"}</span>
                    {userData.role === "admin" && (
                      <button
                        onClick={() => handleReset("communication", day.date)}
                        className="text-red-500 ml-2"
                        title="Reset Communication"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                </td>

                {/* Performance */}
                <td className="p-2 border">
                  <div className="flex justify-between items-center">
                    <span>{getPerformanceScore(day.date)}</span>
                    {userData.role === "admin" && (
                      <button
                        onClick={() => handleReset("performance", day.date)}
                        className="text-red-500 ml-2"
                        title="Reset Performance"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                </td>

                {/* Delete Row */}
                <td className="p-2 border text-center">
                  {userData.role === "admin" && (
                    <button
                      onClick={() => handleDeleteRow(day.date)}
                      className="text-red-700 hover:text-red-900"
                      title="Delete Row"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
