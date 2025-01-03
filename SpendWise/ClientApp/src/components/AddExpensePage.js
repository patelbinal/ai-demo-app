import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = () => {
    const [description, setDescription] = useState('');
    const [Amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories from the API
        axios.get('https://localhost:7041/api/Category', { withCredentials: true })
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
                setError('Failed to fetch categories');
            });
    }, []);

    const handleAddExpense = (e) => {
        e.preventDefault();
        axios
            .post('https://localhost:7041/api/Expense', { Amount: Amount, Description : description, CategoryId: categoryId }, { withCredentials: true })
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
                        value={Amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.description}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Expense
                </Button>
            </Form>
        </div>
    );
};

export default AddExpensePage;