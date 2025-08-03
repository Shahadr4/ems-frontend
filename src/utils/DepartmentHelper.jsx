// DepartmentHelper.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Column definitions for the DataTable
export const columns = [
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
    cell: (row) => row.actions,
  },
];

// Action buttons component
export const DepartmentButtons = ({ id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://vercel.com/shahadr4s-projects/ems-backend/api/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert("Department deleted successfully.");
        onDelete(id); // Notify parent to update list
      } else {
        alert("Deletion failed.");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Server error occurred.");
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
       
        className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium"
      
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
};
