const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    res.status(401).json({ msg: 'Missing credentials' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, config.authentication.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid credentials' });
  }
};

module.exports = authenticate;
