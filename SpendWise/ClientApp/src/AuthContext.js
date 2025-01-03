import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details if logged in
        axiosInstance
            .get('/api/Auth/me')
            .then((response) => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const logout = () => {
        // const navigate = useNavigate();
        
        axiosInstance
            .post('/api/Auth/logout')
            .then(() => {
                setUser(null);
                // setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
            })
            .catch((err) => console.error('Logout failed:', err));
    };


    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
