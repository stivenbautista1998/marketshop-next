import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtectedRoute = ({ currentUser, children }) => {
    // if the user already is logged in, then instead of going to login, go to home.
    if(currentUser) {
        return <Navigate to="/" />
    }
    return children;
};

export { LoginProtectedRoute };