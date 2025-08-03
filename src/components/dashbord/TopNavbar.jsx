import React from 'react';
import { FiSearch, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../authContext/authContext';

function TopNavbar() {
  const { user } = useAuth();

  // Format today's date as YYYY/MM/DD
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0].replace(/-/g, '/');

  return (
    <div className="flex justify-between items-center bg-gray-200 px-6 py-3 border-b border-gray-300">
      {/* Left: Date */}
      <div className="text-sm text-gray-600 font-medium">
        Date: {formattedDate}
      </div>

      {/* Right: Welcome and Icons */}
      <div className="flex items-center space-x-6 text-gray-600">
        <span className="text-sm font-medium">Welcome, {user.name}</span>
        <div className="flex items-center space-x-4 text-lg">
        
          <FiSettings className="cursor-pointer hover:text-black" />
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
