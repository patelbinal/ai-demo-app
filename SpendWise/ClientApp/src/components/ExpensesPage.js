import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch expenses
        axiosInstance.get('https://localhost:7041/api/Expense', {
            params: {
                searchTerm,
                categoryId
            }
        }).then(response => setExpenses(response.data));

        // Fetch categories for the filter dropdown
        axiosInstance.get('https://localhost:7041/api/Category').then(response => setCategories(response.data));
    }, [searchTerm, categoryId]);

    const deleteExpense = (id) => {
        axiosInstance.delete(`https://localhost:7041/api/Expense/${id}`).then(() => {
            window.location.reload(); // Refresh the page after deleting the expense
        });
    };

    return (
        <div>
            <h3>Expenses</h3>
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Search by description"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            as="select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">All Category</option>
                            {categories.map(cat => (
                                <option key={cat.ID} value={cat.id}>{cat.description}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map(exp => (
                    <tr key={exp.id}>
                        <td>{exp.description}</td>
                        <td>{exp.amount}</td>
                        <td>{exp.category.description}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteExpense(exp.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ExpensesPage;