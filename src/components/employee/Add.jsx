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
      setDepartments(data || []);
    };
    getDepartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];

      if (file && file.size > 1024 * 1024 * 2) {
        alert("Image size must be under 2MB");
        return;
      }

      setFormData((prev) => ({ ...prev, profileImage: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileImage) {
      alert("Please upload a profile image.");
      return;
    }

    const formDataObj = new FormData();

    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

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
      console.error("Error:", error);
      alert(error.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-center border-b pb-2">
          Add Employee
        </h3>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Name */}
        <InputField
          label="Employee Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        {/* Employee ID */}
        <InputField
          label="Employee ID"
          name="employeeId"
          type="text"
          value={formData.employeeId}
          onChange={handleInputChange}
          required
        />

        {/* Email */}
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        {/* Department */}
        <div>
          <Label text="Department" />
          <select
            name="department"
            onChange={handleInputChange}
            value={formData.department}
            className="form-select"
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
          <Label text="Role" />
          <select
            name="role"
            onChange={handleInputChange}
            value={formData.role}
            className="form-select"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Salary */}
        <InputField
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleInputChange}
          required
        />

        {/* Gender */}
        <div>
          <Label text="Gender" />
          <select
            name="gender"
            onChange={handleInputChange}
            value={formData.gender}
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* DOB */}
        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleInputChange}
        />

        {/* Password */}
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        {/* Profile Image */}
        <div>
          <Label text="Upload Image" />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleInputChange}
            className="form-file"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// 🔹 Reusable Input Field
const InputField = ({ label, name, type, value, onChange, required }) => (
  <div>
    <Label text={label} />
    <input
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className="form-input"
    />
  </div>
);

// 🔹 Reusable Label
const Label = ({ text }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
);

// 🔹 Basic TailwindCSS Classes (Optional Utility Style)
const styles = `
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .form-select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background-color: white;
  }
  .form-file {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.875rem;
    color: #4b5563;
  }
`;
