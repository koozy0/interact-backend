const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Return HTTP 401 error if a token is not found
  if (!token) {
    const message = 'Missing credentials';
    const status = 401;
    res.status(status).json({ message, status });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    req.user = decoded;

    next();
  } catch (err) {
    const message = 'Invalid credentials';
    const status = 401;
    res.status(status).json({ message, status });
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user.isAdmin) {
    next();
  } else {
    const message = 'Administrator rights are required to perform this action';
    const status = 403;
    res.status(status).json({ message, status });
  }
};

module.exports = { authenticate, isAdmin };
