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

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user.role.includes('administrator')) {
    next();
  } else {
    res.status(403).json({
      msg: 'Administrator rights are required to perform this action',
    });
  }
};

module.exports = { authenticate, isAdmin };
