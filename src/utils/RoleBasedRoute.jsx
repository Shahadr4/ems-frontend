import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authContext/authContext';

// Accept 'requiredRole' and 'children' as props
const RoleBasedRoute = ({ requiredRole, children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    // Check if user is authenticated AND has one of the required roles
    if (user && requiredRole.includes(user.role)) {
        return children; // Render the protected content
    }

    // Redirect to unauthorized if user is authenticated but doesn't have the required role
    if (user && !requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
};

export default RoleBasedRoute;
