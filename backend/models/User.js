// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collegeId: { type: String, required: true, unique: true }, // college ID login
  email: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
