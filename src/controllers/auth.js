const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.authentication.jwtSecret,
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserPrivate = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { authUser, getUserPrivate };
