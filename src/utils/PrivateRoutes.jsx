import React from 'react'
import { useAuth } from '../authContext/authContext';
import { Navigate } from 'react-router-dom';

const  PrivateRoutes=({children}) =>{
    const { user, loading } = useAuth(); // Use the user data from auth context
    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }   
    return user ? children : <Navigate to="/login" />; // Redirect to login if user is not authenticated


  
}

export default PrivateRoutes
