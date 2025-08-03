import React, { useEffect } from 'react';
import { useAuth } from '../authContext/authContext';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminsideBar from '../components/dashbord/AdminsideBar';
import TopNavbar from '../components/dashbord/TopNavbar';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex-shrink-0 overflow-y-auto">
        <AdminsideBar />
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
  );
}

export default AdminDashboard;
