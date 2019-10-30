const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Return HTTP 401 error if a token is not found
  if (!token) {
    const msg = 'Missing credentials';
    res.status(401).json({ msg });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.authentication.jwtSecret);
    req.user = decoded;

    next();
  } catch (err) {
    const msg = 'Invalid credentials';
    res.status(401).json({ msg });
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user.isAdmin) {
    next();
  } else {
    const msg = 'Administrator rights are required to perform this action';
    res.status(403).json({ msg });
  }
};

module.exports = { authenticate, isAdmin };
