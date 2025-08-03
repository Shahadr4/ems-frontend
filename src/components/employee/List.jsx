import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/EmployeeHelper';

export default function List() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://vercel.com/shahadr4s-projects/ems-backend/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          ...emp,
          _id: emp._id,
          sno: sno++,
          department: emp.department?.dep_name || "N/A",
          name: emp.userId?.name || "N/A",
          email: emp.userId?.email || "N/A",
          profileImage: emp.userId?.profileImage,
          dob: emp.dob,
          salary: emp.salary,
        }));
        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.response?.data?.error || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const results = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-100 rounded-xl shadow-md mt-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b pb-2">
          Manage Employees
        </h3>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search employee"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          Add Employee
        </Link>
      </div>

      {/* DataTable */}
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <DataTable
          columns={columns(navigate)}
          data={filteredEmployees}
          pagination
          striped
          highlightOnHover
          responsive
          progressPending={loading}
          customStyles={{
            headCells: {
              style: {
                fontWeight: 'bold',
                fontSize: '14px',
              },
            },
            rows: {
              style: {
                fontSize: '14px',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
