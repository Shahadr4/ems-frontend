import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";





const statusColorMap = {
  Present: "bg-green-500 text-white",
  Absent: "bg-red-500 text-white",
  halfday: "bg-yellow-500 text-white",
  Unmarked: "bg-gray-300 text-gray-600",
};

export default function AttendenceList() {
  const [records, setRecords] = useState({});
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading,setLoading] = useState(false)
 
const { userId } = useParams();

  useEffect(() => {
    if (userId) fetchAttendance();
  }, [month, year]);

 
const fetchAttendance = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      `https://employee-frontend-it9y.vercel.app/api/attendence/monthly-records/${userId}?month=${month + 1}&year=${year}`
    );
    const map = {};
    for (let r of res.data.records) {
      const day = new Date(r.date).getDate();
      map[day] = r.status;
    }
    setRecords(map);
    console.log("records", map);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    setRecords({});
  } finally {
    setLoading(false);
  }
};
  const renderCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0
    const totalDays = new Date(year, month + 1, 0).getDate();

    const calendarCells = [];
    for (let i = 0; i < firstDay; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="h-20"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const status = records[day] || "Unmarked";
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b pb-2">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })} Attendance
      </h2>

      {/* Month & Year Picker */}
      <div className="flex justify-center gap-3 mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-3 py-2 w-24"
        />
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Grid */}
      {renderCalendar()}
    </div>
  );
}
