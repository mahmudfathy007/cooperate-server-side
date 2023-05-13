const mongoose = require('mongoose');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Skill = require('../models/skill.model');
const config = require('../config/config');
// Connect to database
mongoose.connect(config.mongoose.url);

// Define async function to seed data
async function seed() {
  // Create User

  const user = new User({
    first_name: 'Mohamed',
    last_name: 'Hesham',
    email: 'admin@test.com',
    username: 'raidenshurikens1236',
    password: 'test@123',
    isEmailVerified: true,
    address: '123 Main St',
    phone: '+1 555-555-5555',
    gender: 'M',
    birthDate: new Date('2000-06-22'),
    country: 'USA',
    role: 'admin',

    education: 'Bachelor of Computer Science',
  });
  await user.save();

  // Disconnect from database
  mongoose.disconnect();
}

// Call seed function
seed();
