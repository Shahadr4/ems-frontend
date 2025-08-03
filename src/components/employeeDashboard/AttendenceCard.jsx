import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaUmbrellaBeach, FaSpinner } from "react-icons/fa";

export default function AttendenceCard({ id }) {
  const [status, setStatus] = useState("Unmarked");
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const today = new Date();
today.setHours(0, 0, 0, 0);

  // Fetch today's attendance status
  const fetchTodayStatus = async () => {
    if (!id) {
      console.error("❌ userId is missing.");
      setStatus("Unmarked");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `https://ems-backend-taupe.vercel.app/api/attendence/status?date=${today}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStatus(res.data.status || "Unmarked");
    } catch (err) {
      console.error("Error fetching today's status", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayStatus();
  }, []);

  // Submit attendance
  const markAttendance = async (markAs) => {
    setMarking(true);
    console.log(markAs)
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://ems-backend-taupe.vercel.app/api/attendence/add",
        { status: markAs },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(markAs); // Optimistically update
    } catch (err) {
      alert(err.response?.data?.error || "Error marking attendance");
    } finally {
      setMarking(false);
    }
  };

  // Status badge color
  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "halfday":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  // Display label
  const statusLabel = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "Present";
      case "absent":
        return "Absent";
      case "halfday":
        return "Half Day";
      default:
        return "Unmarked";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-1 rounded-xl">
        <div className="bg-white rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            📅 Today's Attendance
          </h2>

          {loading ? (
            <div className="text-gray-600 flex justify-center items-center gap-2">
              <FaSpinner className="animate-spin" /> Loading...
            </div>
          ) : (
            <>
              {/* Status badge */}
              <div
                className={`px-5 py-2 mb-6 rounded-full text-white font-semibold text-lg ${getBadgeColor(
                  status
                )}`}
              >
                {statusLabel(status)}
              </div>

              {status === "Unmarked" ? (
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <button
                    disabled={marking}
                    onClick={() => markAttendance("Present")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition text-white ${
                      marking
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    <FaCheck /> Present
                  </button>
                  <button
                    disabled={marking}
                    onClick={() => markAttendance("Absent")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition text-white ${
                      marking
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    <FaTimes /> Absent
                  </button>
                  <button
                    disabled={marking}
                    onClick={() => markAttendance("halfday")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md shadow transition text-white ${
                      marking
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    <FaUmbrellaBeach /> Half Day
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-4">
                  Attendance already marked for today.
                </p>
              )}
            </>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Date: {today}
          </p>
        </div>
      </div>
    </div>
  );
}
