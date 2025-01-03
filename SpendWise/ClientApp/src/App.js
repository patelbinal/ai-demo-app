import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExpensesPage from './components/ExpensesPage';
import CategoriesPage from './components/CategoriesPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/expenses" element={<PrivateRoute component={ExpensesPage} />} />
                    <Route path="/categories" element={<PrivateRoute component={CategoriesPage} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" exact element={<LoginPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;