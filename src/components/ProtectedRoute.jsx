import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ currentUser, children }) => {
    if(!currentUser) {
        // user is not authenticated
        return <Navigate to="/login" />
    }
    // user is authenticated
    return children;
};

export { ProtectedRoute };