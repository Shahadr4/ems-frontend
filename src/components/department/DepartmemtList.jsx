import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns as baseColumns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://vercel.com/shahadr4s-projects/ems-backend/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          ...dep,
          sno: sno++,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.response?.data?.error || "Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const onDepartmentDelete = async (id) => {
    try {
      await axios.delete(`https://vercel.com/shahadr4s-projects/ems-backend/api/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedList = departments.filter((dep) => dep._id !== id);
      setDepartments(updatedList);
      setFilteredDepartments(updatedList);
    } catch (error) {
      alert("Failed to delete department");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const results = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(results);
  }, [searchTerm, departments]);

  const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Department Name",
      selector: (row) => row.dep_name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => <DepartmentButtons id={row._id} onDelete={onDepartmentDelete} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-400 shadow-md rounded-xl max-w-5xl mx-auto mt-8">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Manage Departments
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Department
        </Link>
      </div>

      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        {loading ? (
          <div className="text-center py-6 text-gray-600 font-medium">Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredDepartments}
            pagination
            striped
            highlightOnHover
          />
        )}
      </div>
    </div>
  );
}
