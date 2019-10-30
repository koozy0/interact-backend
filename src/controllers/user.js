const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find User by given id, exclude "password" field
    const user = await User.findById(id).select('-password');

    // Return HTTP 404 error if a matching User is not found
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  const { username, password, name, email, role, secret } = req.body;

  if (!secret) {
    const msg = 'Secret key is required';
    res.status(400).json({ msg });
  } else if (secret !== config.user.adminSecret) {
    const msg = 'Invalid secret key';
    res.status(400).json({ msg });
  }

  // Check for existing User
  const hasUser = await User.findOne({ username });

  if (hasUser) {
    const msg = 'User already exists';
    return res.status(400).json({ msg });
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

const updateOne = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

module.exports = {
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
