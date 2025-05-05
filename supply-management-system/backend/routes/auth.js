const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/config');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(401).json({ error: 'Неверные учетные данные' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Неверные учетные данные' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;