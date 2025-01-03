﻿import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch expenses
        axios.get('/api/Expense', {
            params: {
                searchTerm,
                categoryId: category,
                startDate,
                endDate
            }
        }).then(response => setExpenses(response.data));

        // Fetch categories for the filter dropdown
        axios.get('/api/Category').then(response => setCategories(response.data));
    }, [searchTerm, category, startDate, endDate]);

    const deleteExpense = (id) => {
        axios.delete(`/api/Expense/${id}`).then(() => {
            setExpenses(expenses.filter(exp => exp.ID !== id));
        });
    };

    return (
        <div>
            <h3>Expenses</h3>
            <Form>
                <Row>
                    <Col md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Search by description"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.ID} value={cat.ID}>{cat.Name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map(exp => (
                    <tr key={exp.ID}>
                        <td>{exp.Description}</td>
                        <td>{exp.Amount}</td>
                        <td>{exp.Category.Name}</td>
                        <td>{new Date(exp.Date).toLocaleDateString()}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteExpense(exp.ID)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ExpensesPage;