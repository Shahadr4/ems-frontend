import React from 'react'
import TopNavbar from '../components/dashbord/TopNavbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/employeeDashboard/SideBarEmp'



function EmployeeDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex-shrink-0 overflow-y-auto">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default EmployeeDashboard
