const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
// Connect to MongoDB
const connectDB = require('../config/db');
connectDB();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  yourPlants: {
    type: [String]
  },
  address: {
    type: String,
    trim: true,
  },
  profileAvatar: {
    type: String,
  },
  isEntered: {
    type: Boolean,
    default: false,
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;