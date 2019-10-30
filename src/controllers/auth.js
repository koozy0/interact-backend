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
      return res.status(404).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isValidPassword = await user.isValidPassword(password);

    // Return HTTP 401 error if the given password is invalid
    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Invalid credentials' });
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

module.exports = { authUser };
