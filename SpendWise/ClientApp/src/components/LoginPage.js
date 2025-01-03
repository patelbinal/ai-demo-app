import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post('https://localhost:7041/api/Auth/login', { email, password }, { withCredentials: true })
            .then(() => {
                navigate('/expenses'); // Redirect to expenses page on successful login
            })
            .catch((err) => {
                setError(err.response?.data?.Message || 'Login failed');
            });
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to register page
    };

    return (
        <div className="login-page">
            <h3>Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Button variant="link" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;