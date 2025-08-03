import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    department: "",
    role: "",
    salary: "",
    gender: "",
    dob: "",
    password: "",
    profileImage: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartments();
      setDepartments(data);
    };
    getDepartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.profileImage || formData.profileImage === "undefined") {
    alert("Please select a profile image.");
    return;
  }

  const formDataObj = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataObj.append(key, formData[key]);
  });

  try {
    const response = await axios.post(
      "https://ems-backend-taupe.vercel.app/api/employee/add",
      formDataObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      navigate("/admin-dashboard/employees");
    }
  } catch (error) {
    console.log("response doesnt get")
    alert(error.response?.data?.error || "Something went wrong");
  }
};


  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-400 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800 text-center border-b pb-2">
          Add Employee
        </h3>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Employee Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <input
            type="text"
            onChange={handleInputChange}
            name="name"
            placeholder="Enter Employee Name"
            required
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            onChange={handleInputChange}
            name="employeeId"
            required
            placeholder="Enter Employee ID"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        {/* Email */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
  <input
    type="email"
    onChange={handleInputChange}
    name="email"
    placeholder="Enter Email"
    required
    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
  />
</div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            onChange={handleInputChange}
            name="department"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.dep_name}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary
          </label>
          <input
            onChange={handleInputChange}
            type="number"
            name="salary"
            required
            placeholder="Enter Salary"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            onChange={handleInputChange}
            name="gender"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            onChange={handleInputChange}
            type="date"
            name="dob"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            required
            placeholder="Enter Password"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            onChange={handleInputChange}
            type="file"
            name="profileImage"
            accept="image/*"
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
