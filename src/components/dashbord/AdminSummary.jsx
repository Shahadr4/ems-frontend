import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaUser } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "https://vercel.com/shahadr4s-projects/ems-backend/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
        alert(error.response?.data?.error || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100">
        <div className="text-gray-600 text-lg font-medium animate-pulse">
          Loading admin summary...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-base">
            Overview of organizational statistics
          </p>
        </div>

        {/* Summary Cards - Centered and Responsive */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/admin-dashboard/employees">
            <SummaryCard
              icon={<FaUser size={28} />}
              text="Total Employees"
              number={summary.totalEmployees}
              color="blue"
            />
          </Link>

          <Link to="/admin-dashboard/department">
            <SummaryCard
              icon={<FaBuilding size={28} />}
              text="Total Departments"
              number={summary.totalDepartments}
              color="purple"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSummary;
