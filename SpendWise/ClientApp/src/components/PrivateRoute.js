import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/expenses" />;
};

export default PrivateRoute;
