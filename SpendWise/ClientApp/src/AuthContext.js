import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

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
        axiosInstance
            .post('/api/Auth/logout')
            .then(() => {
                setUser(null);
            })
            .catch((err) => console.error('Logout failed:', err));
    };


    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
