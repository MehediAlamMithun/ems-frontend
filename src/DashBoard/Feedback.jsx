import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Feedback = () => {
  const [dailyFeedback, setDailyFeedback] = useState([]);
  const [performancePoints, setPerformancePoints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axiosSecure.get(`/feedback?email=${user?.email}`);
        setDailyFeedback(res.data.dailyFeedback || []);
        setPerformancePoints(res.data.performancePoints || 0);
      } catch (err) {
        console.error("❌ Failed to fetch feedback:", err);
      }
    };
    if (user?.email) fetchFeedback();
  }, [user?.email, axiosSecure]);

  const feedbackForCommunication = (rating) => {
    if (rating >= 8) return "🌟 Excellent";
    if (rating >= 6) return "👍 Good";
    if (rating > 0) return "⚠️ Needs Improvement";
    return "❌ Not Rated";
  };

  const feedbackForPerformance = (points) => {
    if (points >= 8) return "🌟 Outstanding";
    if (points >= 5) return "✅ Satisfactory";
    if (points > 0) return "⚠️ Could Improve";
    return "❌ No Mark Given";
  };

  const feedbackForAttendance = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return "❌ Missing";

    const [inH, inM] = clockIn.split(":").map(Number);
    const [outH, outM] = clockOut.split(":").map(Number);
    const worked = (outH + outM / 60) - (inH + inM / 60);

    if (worked >= 8) return `✅ Full Shift (${worked.toFixed(1)} hrs)`;
    if (worked > 0) return `⚠️ Partial Shift (${worked.toFixed(1)} hrs)`;
    return "❌ Invalid Time";
  };

  const totalPages = Math.ceil(dailyFeedback.length / itemsPerPage);
  const paginatedData = dailyFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📋 Daily Feedback</h2>

      {dailyFeedback.length === 0 ? (
        <p>No feedback available yet.</p>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedData.map((entry, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">📅 {entry.date}</h3>

                <p>
                  🕒 Clock In: <strong>{entry.clockIn || "N/A"}</strong>{" "}
                  <span className="text-sm text-gray-600">
                    ({feedbackForAttendance(entry.clockIn, entry.clockOut)})
                  </span>
                </p>

                <p>
                  🕔 Clock Out: <strong>{entry.clockOut || "N/A"}</strong>
                </p>

                <p>
                  💬 Communication: <strong>{entry.communicationRating}</strong>{" "}
                  <span className="text-sm text-gray-600">
                    ({feedbackForCommunication(entry.communicationRating)})
                  </span>
                </p>

                <p>
                  🧠 Performance: <strong>{performancePoints}</strong>{" "}
                  <span className="text-sm text-gray-600">
                    ({feedbackForPerformance(performancePoints)})
                  </span>
                </p>

                <p>💸 Payroll: <strong>{entry.payroll || "N/A"}</strong></p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
