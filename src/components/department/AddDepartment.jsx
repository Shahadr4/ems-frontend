
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddDepartment() {

    const [department,setDepartment] = useState({
        dep_name: '',
        description: ''
    })

    const navigate = useNavigate();


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({...department,[name]: value}); 
    };



    const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Department added:', department);
    // Reset form or show success message
    try {
        const response = await axios.post('https://employee-frontend-it9y.vercel.app/api/department/add', department, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}` // Include token in headers
            }
        });

        if (response.data.success) {
            navigate('/admin-dashboard/department'); // Redirect to department list
        }

    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
};

  return (
    <div className="p-6 max-w-2xl mx-auto mt-6 bg-gray-400 shadow-md rounded-xl">
      {/* Heading */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 text-center border-b pb-2">
          Add Department
        </h3>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Department Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name='dep_name'
            placeholder="Enter Department Name"
            className="block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Description (Textarea) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name='description'
            onChange={handleChange}
            rows="4"
            placeholder="Enter department description..."
            className="block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
