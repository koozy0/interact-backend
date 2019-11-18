const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const createOne = async (req, res, next) => {
  const { username, password, name, email, role, secret } = req.body;

  if (!secret) {
    const message = 'Secret key is required';
    const status = 400;
    return res.status(status).json({ message, status });
  } else if (secret !== config.user.adminSecret) {
    const message = 'Invalid secret key';
    const status = 400;
    return res.status(status).json({ message, status });
  }

  // Check for existing User
  const hasUser = await User.findOne({ username });

  if (hasUser) {
    const message = 'User already exists';
    const status = 400;
    return res.status(status).json({ message, status });
  }

  try {
    // Create new User
    const newUser = new User({ username, password, name, email, role });
    const user = await newUser.save();

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      config.auth.jwtSecret,
    );

    res.status(201).json({
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

const deleteOne = async (req, res, next) => {};

const getOne = async (req, res, next) => {
  const { username } = req.params;

  try {
    // Find User by given id, exclude "password" field
    const user = await User.findOne({ username }).select('-password');

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

const updateOne = async (req, res, next) => {};

module.exports = {
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
