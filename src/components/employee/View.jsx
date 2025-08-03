import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-taupe.vercel.app/api/employee/${id}`,
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

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!employee) return;
      try {
        const res = await axios.get(
          `https://ems-backend-taupe.vercel.app/api/attendence/monthly-records/${employee.userId._id}?month=${month + 1}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const map = {};
        for (let r of res.data.records) {
          const day = new Date(r.date).getDate();
          map[day] = r.status;
        }
        setAttendanceRecords(map);
      } catch (err) {
        console.error("Attendance fetch error:", err);
      }
    };
    fetchAttendance();
  }, [employee, month, year]);

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading employee data...
        </p>
      </div>
    );
  }

  const statusColorMap = {
    Present: "bg-green-500 text-white",
    Absent: "bg-red-500 text-white",
    Leave: "bg-yellow-500 text-white",
    Unmarked: "bg-gray-200 text-gray-600",
  };

  const renderCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const calendarCells = [];

    for (let i = 0; i < firstDay; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="h-20"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const status = attendanceRecords[day] || "Unmarked";
      calendarCells.push(
        <div
          key={day}
          className={`flex flex-col items-center justify-center border rounded p-2 shadow-sm ${statusColorMap[status]}`}
        >
          <div className="font-bold">{day}</div>
          <div className="text-xs">{status}</div>
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-2">{calendarCells}</div>;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-white px-4 py-10 flex flex-col items-center justify-start">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-5xl w-full p-6 sm:p-10 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md">
            <img
              src={`https://ems-backend-taupe.vercel.app/${employee.userId.profileImage}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-gray-800 w-full">
            <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
              {employee.userId.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Employee ID:{" "}
              <span className="font-semibold">{employee.employeeId}</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-base">
              <p>
                <span className="text-gray-600 font-medium">Email:</span>{" "}
                {employee.userId.email}
              </p>
              <p>
                <span className="text-gray-600 font-medium">DOB:</span>{" "}
                {new Date(employee.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="text-gray-600 font-medium">Gender:</span>{" "}
                {employee.gender}
              </p>
              <p>
                <span className="text-gray-600 font-medium">Department:</span>{" "}
                {employee.department?.dep_name || "Not Assigned"}
              </p>
              <p>
                <span className="text-gray-600 font-medium">Salary:</span> ₹
                {employee.salary}
              </p>
              <p>
                <span className="text-gray-600 font-medium">Role:</span>{" "}
                {employee.userId.role}
              </p>
            </div>
          </div>
        </div>

        {/* Attendance Calendar */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Attendance for {new Date(year, month).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="flex items-center gap-2">
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}
