const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: Number,
      required: false,
      validator(value) {
        if (validator.isEmpty(value)) {
          throw new Error('Please enter a valid phone number');
        }
      },
    },
    gender: {
      type: String,
      required: false,
      enum: ['M', 'F'],
    },
    birthDate: {
      type: Date,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ['admin', 'freelancer', 'client'],
    },
  },
  {
    timestamps: true,
  }
);

// Check if email is taken
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};
// Check if username is taken
userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};
// Check if password matches the user's password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
