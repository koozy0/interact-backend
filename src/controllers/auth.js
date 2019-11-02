const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    // Return HTTP 404 error if a matching User is not found
    if (!user) {
      const message = 'User does not exist';
      const status = 404;
      return res.status(status).json({ message, status });
    }

    // Validate password
    const isValidPassword = await user.isValidPassword(password);

    // Return HTTP 401 error if the given password is invalid
    if (!isValidPassword) {
      const message = 'Invalid credentials';
      const status = 401;
      return res.status(401).json({ message, status });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      config.auth.jwtSecret,
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loadUser = async (req, res, next) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id).select('-password');

    // Return HTTP 404 error if a matching User is not found
    if (!user) {
      const message = 'User not found';
      const status = 404;
      return res.status(404).json({ message, status });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { authUser, loadUser };
