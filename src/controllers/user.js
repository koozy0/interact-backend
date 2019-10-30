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
  const { username, password, name, email, role } = req.body;

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
    const { id, username, name, email, role, isAdmin } = user;

    // Create JWT
    const payload = { id, username, isAdmin };
    const token = jwt.sign(payload, config.authentication.jwtSecret);

    res
      .status(201)
      .json({ token, user: { id, username, name, email, role, isAdmin } });
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
