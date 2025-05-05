import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [authToken]);

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
                        <td>
                            <Button variant="info" size="sm">Edit</Button>{' '}
                            <Button variant="danger" size="sm">Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductList;