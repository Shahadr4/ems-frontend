import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../authContext/authContext";
import AttendenceCard from "./AttendenceCard";

export default function Summary() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 text-white px-6 sm:px-16 py-12 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">
        Welcome, <span className="text-yellow-200">{user?.name || "User"}</span>
      </h1>

      {/* Attendance Card Section */}
      <div className="w-full max-w-xl">
        <AttendenceCard id={user._id}  />
      </div>
    </div>
  );
}
