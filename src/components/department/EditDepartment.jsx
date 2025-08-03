import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditDepartment() {
    const { id } = useParams();
    const [department, setDepartment] = useState({}); // Use singular
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://vercel.com/shahadr4s-projects/ems-backend/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setDepartment(response.data.department); // Use correct property
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);


    const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Department added:', department);
    // Reset form or show success message
    try {
        const response = await axios.put(`https://vercel.com/shahadr4s-projects/ems-backend/api/department/${id}`, department, {
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
        <>
            {loading ? (
                <div>Loading....</div>
            ) : (
                <div className="p-6 max-w-2xl mx-auto mt-6 bg-gray-400 shadow-md rounded-xl">
                    {/* Heading */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 text-center border-b pb-2">
                            Edit Department
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
                                value={department.dep_name || ''}
                                type="text"
                                name="dep_name"
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
                                name="description"
                                value={department.description || ''}
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
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}