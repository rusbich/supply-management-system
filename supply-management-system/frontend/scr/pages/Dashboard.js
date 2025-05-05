import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';

const Dashboard = () => {
  const { data: stats, loading } = useFetch('/api/dashboard/stats');

  return (
    <div>
      <h2>Панель управления</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Товаров</Card.Title>
                <Card.Text>{stats?.products || 0}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Поставок</Card.Title>
                <Card.Text>{stats?.supplies || 0}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Продаж</Card.Title>
                <Card.Text>{stats?.sales || 0}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;