import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const productsRes = await axios.get('/api/products');
      const salesRes = await axios.get('/api/sales');
      setProducts(productsRes.data);
      setSales(salesRes.data);
    };
    fetchData();
  }, []);

  const handleSale = async () => {
    await axios.post('/api/sales', { product_id: selectedProduct, quantity });
    alert('Продажа зарегистрирована!');
  };

  return (
    <div>
      <h3>Регистрация продажи</h3>
      <Form>
        <Form.Group>
          <Form.Label>Товар</Form.Label>
          <Form.Control as="select" onChange={(e) => setSelectedProduct(e.target.value)}>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Количество</Form.Label>
          <Form.Control 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
          />
        </Form.Group>
        <Button onClick={handleSale}>Оформить</Button>
      </Form>
    </div>
  );
};

export default Sales;