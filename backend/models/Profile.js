// models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    default: 'Unknown',
  },
  role: {
    type: String,
    enum: ['Seva Provider', 'Seva Seeker'],
    default: 'Seva Seeker',
  },
  servicesProvided: {
    type: Number,
    default: 0,
  },
  activeRequests: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
