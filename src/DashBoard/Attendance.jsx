import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const [userData, setUserData] = useState(null);
  const [today, setToday] = useState({
    date: "",
    weekDay: "",
    clockIn: "",
    clockOut: ""
  });

  const getCurrentDayInfo = () => {
    const now = new Date();
    const weekDay = now.toLocaleDateString("en-US", { weekday: "long" });
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].slice(0, 5); // HH:mm
    return { date, weekDay, time };
  };

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get("/users").then((res) => {
        const foundUser = res.data.find((u) => u.email === user.email);
        setUserData(foundUser);

        const { date } = getCurrentDayInfo();
        const entry = foundUser.attendance?.find((d) => d.date === date);
        if (entry) {
          setToday({
            date,
            weekDay: entry.weekDay,
            clockIn: entry.clockIn || "",
            clockOut: entry.clockOut || ""
          });
        } else {
          const { weekDay } = getCurrentDayInfo();
          setToday({ date, weekDay, clockIn: "", clockOut: "" });
        }
      });
    }
  }, [user, axiosPublic]);

  const handleClockIn = async () => {
    if (!userData || !userData._id) {
      Swal.fire("Please wait", "User data is still loading...", "info");
      return;
    }
  
    const { date, weekDay, time } = getCurrentDayInfo();
  
    try {
      await axiosPublic.patch(`/users/${userData._id}`, {
        action: "clockIn",
        date,
        weekDay,
        clockIn: time,
      });
  
      Swal.fire("Clocked In!", `You clocked in at ${time}`, "success");
      setToday((prev) => ({ ...prev, clockIn: time }));
    } catch (err) {
      console.error("Clock In failed:", err);
      Swal.fire("Error", "Failed to clock in", "error");
    }
  };
  

  const handleClockOut = async () => {
    const { date, time } = getCurrentDayInfo();

    try {
      await axiosPublic.patch(`/users/${userData._id}`, {
        action: "clockOut",
        date,
        clockOut: time
      });

      Swal.fire("Clocked Out!", `You clocked out at ${time}`, "success");
      setToday((prev) => ({ ...prev, clockOut: time }));
    } catch (err) {
      console.error("Clock Out failed:", err);
      Swal.fire("Error", "Failed to clock out", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Today's Attendance</h2>
      <p className="mb-2 text-gray-700"><strong>Date:</strong> {today.date}</p>
      <p className="mb-2 text-gray-700"><strong>Day:</strong> {today.weekDay}</p>
      <p className="mb-2 text-green-600"><strong>Clock In:</strong> {today.clockIn || "--:--"}</p>
      <p className="mb-4 text-red-600"><strong>Clock Out:</strong> {today.clockOut || "--:--"}</p>

      <div className="space-x-4">
        <button
          onClick={handleClockIn}
          disabled={!!today.clockIn}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={!today.clockIn || !!today.clockOut}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Clock Out
        </button>
      </div>
    </div>
  );
};

export default Attendance;
