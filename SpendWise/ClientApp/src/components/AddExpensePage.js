import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddExpense = (e) => {
        e.preventDefault();
        axios
            .post('https://localhost:7041/api/Expenses', { description, amount, category }, { withCredentials: true })
            .then(() => {
                navigate('/expenses'); // Redirect to expenses page on successful addition
            })
            .catch((err) => {
                setError(err.response?.data?.Message || 'Failed to add expense');
            });
    };

    return (
        <div className="add-expense-page">
            <h3>Add Expense</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleAddExpense}>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Expense
                </Button>
            </Form>
        </div>
    );
};

export default AddExpensePage;