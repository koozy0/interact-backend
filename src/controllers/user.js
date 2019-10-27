const User = require('../models/User');

const getOne = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

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

  // Create new User
  const newUser = new User({
    username,
    password,
    name,
    email,
    role,
  });

  try {
    const user = await newUser.save();
    res.status(201).json({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      secret: user.secret,
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
