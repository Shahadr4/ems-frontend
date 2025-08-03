import axios from "axios";

export const columns = ( navigate) => [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    wrap: true,
  },
  {
    name: "Profile",
    cell: (row) => (
      <img
  src={
    employee.userId.profileImage && employee.userId.profileImage.data
      ? `data:${employee.userId.profileImage.contentType};base64,${employee.userId.profileImage.data}`
      : "/default-profile.png" // fallback image path
  }
  alt="Profile"
  className="w-10 h-10 object-cover border border-gray-300"
/>
    ),
    width: "80px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    wrap: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    wrap: true,
  },
  {
    name: "Salary",
    selector: (row) => row.salary,
    wrap: true,
  },
  {
    name: "DOB",
    selector: (row) => new Date(row.dob).toLocaleDateString(),
    wrap: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="flex flex-wrap gap-2">
        {/* View Button */}
        <button
          onClick={() => navigate(`/admin-dashboard/employee/${row._id}`)}
          className="bg-blue-100 text-blue-700 px-4 py-2 text-sm border border-blue-300 hover:bg-blue-200 transition"
        >
          View
        </button>

        {/* Edit Button */}
        <button
          onClick={() => navigate(`/admin-dashboard/employee/edit/${row._id}`)}
          className="bg-gray-100 text-gray-800 px-4 py-2 text-sm border border-gray-300 hover:bg-gray-200 transition"
        >
          Edit
        </button>

       
      </div>
    ),
    width: "250px",
  },
];









export const fetchDepartments = async()=>{
 
    let departments
   
      try {
        const response = await axios.get("https://ems-backend-taupe.vercel.app/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
            departments = response.data.departments
            console.log("Departments fetched successfully:", departments);
         
        
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {

          console.error("Error fetching departments:", error.response.data.error);
          alert(error.response.data.error);
        }
      }
      return departments 
}


