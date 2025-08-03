import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  FaUserCircle } from "react-icons/fa";

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-chi.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          alert("Employee not found.");
          navigate("/admin-dashboard/employees");
        } else {
          alert("Error fetching employee.");
        }
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading employee data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-md max-w-4xl w-full p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Profile Image */}
        <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow">
          {employee.userId.profileImage ? (
            <img
              src={`https://ems-backend-taupe.vercel.app/${employee.userId.profileImage}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-300 text-[180px]" />
          )}
        </div>

        {/* Details Section */}
        <div className="flex-1 text-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left border-b pb-2">
            Employee Details
          </h2>
          <div className="space-y-3 text-sm sm:text-base">
            <p><span className="font-semibold">Name:</span> {employee.userId.name}</p>
            <p><span className="font-semibold">Employee ID:</span> {employee.employeeId}</p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(employee.dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </p>
            <p><span className="font-semibold">Gender:</span> {employee.gender}</p>
            <p><span className="font-semibold">Department:</span> {employee.department?.dep_name || "Not Assigned"}</p>
           
          </div>
        </div>
      </div>
    </div>
  );
}
