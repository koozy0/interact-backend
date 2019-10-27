const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      match: /^[\w\d]+$/,
      unique: true,
      minlength: 6,
      maxlength: 30,
      required: true,
    },

    password: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
    },

    name: {
      type: String,
      maxlength: 255,
      required: true,
    },

    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
      minlength: 6,
      maxlength: 255,
      required: true,
    },

    role: {
      type: [String],
      enum: ['user', 'administrator'],
      default: ['user'],
    },

    secret: String,
  },
  { timestamps: true },
);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    this.secret = uuid();
    return next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.isAdmin = function() {
  return this.role.includes('administrator');
};

UserSchema.methods.getAuthToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin() },
    config.authentication.jwtSecret,
  );
};

module.exports = User = mongoose.model('user', UserSchema);
