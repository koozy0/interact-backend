const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getOne = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select([
      '-_id',
      '-password',
      '-secret',
    ]);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  const { username, password, name, email, role } = req.body;

  // Check for existing user
  const hasUser = await User.findOne({ username });

  if (hasUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  try {
    // Create new User
    const newUser = new User({
      username,
      password,
      name,
      email,
      role,
    });
    const user = await newUser.save();

    // Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.authentication.jwtSecret,
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        secret: user.secret,
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
