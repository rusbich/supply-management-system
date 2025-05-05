const db = require('../config/db');

exports.createSupply = async (req, res) => {
  const { supplier_id, product_id, quantity } = req.body;
  
  try {
    // 1. Добавляем запись о поставке
    const { rows: supply } = await db.query(
      `INSERT INTO supplies 
       (supplier_id, product_id, quantity, received_by) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [supplier_id, product_id, quantity, req.user.id]
    );

    // 2. Обновляем количество товара
    await db.query(
      'UPDATE products SET quantity = quantity + $1 WHERE id = $2',
      [quantity, product_id]
    );

    res.status(201).json(supply[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};