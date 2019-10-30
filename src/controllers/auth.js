const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    const { id, username, name, email, role, isAdmin } = user;

    // Return HTTP 404 error if a matching User is not found
    if (!user) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isValidPassword = await user.isValidPassword(password);

    // Return HTTP 401 error if the given password is invalid
    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Create JWT
    const payload = { id, username, isAdmin };
    const token = jwt.sign(payload, config.authentication.jwtSecret);

    res
      .status(200)
      .json({ token, user: { id, username, name, email, role, isAdmin } });
  } catch (err) {
    next(err);
  }
};

module.exports = { authUser };
