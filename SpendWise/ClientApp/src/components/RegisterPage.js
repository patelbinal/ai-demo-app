import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post('https://localhost:7041/api/Auth/register',
                { name, email, password },
            )
            .then(() => {
                setSuccess('Registration successful! You can now login.');
                setError('');
                setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
            })
            .catch((err) => {
                setError(err.response?.data?.Message || 'Registration failed');
                setSuccess('');
            });
    };

    return (
        <div className="register-page">
            <h3>Register</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
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
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
