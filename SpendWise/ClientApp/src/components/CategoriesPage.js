import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        axios.get('/api/Category').then(response => setCategories(response.data));
    }, []);

    const addCategory = () => {
        axios.post('/api/Category', { Name: categoryName }).then(response => {
            setCategories([...categories, response.data]);
            setCategoryName("");
        });
    };

    const deleteCategory = (id) => {
        axios.delete(`/api/Category/${id}`).then(() => {
            setCategories(categories.filter(cat => cat.ID !== id));
        });
    };

    return (
        <div>
            <h3>Categories</h3>
            <Form>
                <Form.Control
                    type="text"
                    placeholder="Add new category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button variant="primary" onClick={addCategory} className="mt-2">Add Category</Button>
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(cat => (
                    <tr key={cat.ID}>
                        <td>{cat.Name}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteCategory(cat.ID)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CategoriesPage;
