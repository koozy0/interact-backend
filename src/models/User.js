const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
      minlength: 4,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function(password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
};

UserSchema.methods.getAuthToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin() },
    config.auth.jwtSecret,
  );
};

UserSchema.virtual('isAdmin').get(function() {
  return this.role.includes('administrator');
});

module.exports = User = mongoose.model('User', UserSchema);
