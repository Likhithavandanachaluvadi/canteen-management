// utils/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ collegeId: 'ADMIN001' });
  if (exists) {
    console.log('Admin already exists');
    process.exit();
  }
  const hashed = await bcrypt.hash('Admin@123', 10);
  const admin = new User({ name: 'Admin', collegeId: 'ADMIN001', email: 'admin@example.com', password: hashed, role: 'admin' });
  await admin.save();
  console.log('Admin created: collegeId=ADMIN001 password=Admin@123');
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });
