const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM products ORDER BY name');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    
    try {
        const { rows } = await db.query(
            'INSERT INTO products (name, description, price, quantity, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, quantity, category]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};