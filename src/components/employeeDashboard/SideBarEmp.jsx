import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
  FaBell
} from 'react-icons/fa';
import { useAuth } from '../../authContext/authContext';




function SideBar() {
  const { user,logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo/Title */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-2xl font-bold tracking-wide text-white">EMS</h3>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <NavLink to="/employee-dashboard" end className={navLinkClass}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={navLinkClass}>
          <FaUser />
          <span>MY PROFILE</span>
        </NavLink>

        

        <NavLink to={`/employee-dashboard/attendence/${user._id}`} className={navLinkClass}>
          <FaBell />
          <span>Attendenece</span>
        </NavLink>

       
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-600 hover:bg-gray-800 transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
