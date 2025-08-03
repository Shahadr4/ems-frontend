import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";

export default function Edit() {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


 

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-frontend-it9y.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee(emp);
          setFormData({
            name: emp.userId?.name || "",
            department: emp.department?._id || "",
            salary: emp.salary || "",
          });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        alert(error.response?.data?.error || "Failed to fetch employee");
      }
    };

    fetchEmployee();
  }, [id]);

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data || []);
    };
    getDepartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("department", formData.department);
    payload.append("salary", formData.salary);
    if (profileImage) {
      payload.append("profileImage", profileImage);
    }

    try {
      const response = await axios.put(
  `https://employee-frontend-it9y.vercel.app/api/employee/edit/${id}`, // ✅ FIXED
  payload,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  }
);
      if (response.data.success) {
        alert("Employee updated successfully");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update employee");
    }
  };

  if (loading || !employee) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 text-center border-b pb-4 mb-6">
        Edit Employee
      </h3>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Employee Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.dep_name}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Profile Image with Preview */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Profile Image
          </label>

          {/* Image Preview */}
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border mb-2"
            />
          ) : employee?.userId?.profileImage ? (
            <img
              src={`https://employee-frontend-it9y.vercel.app/${employee.userId.profileImage}`}
              alt="Current"
              className="w-32 h-32 object-cover rounded-full border mb-2"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 mb-2">
              No Image
            </div>
          )}

          {/* File input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}
