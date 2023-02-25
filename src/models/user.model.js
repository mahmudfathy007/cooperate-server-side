const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please enter your first name'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Please enter your last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      trim: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: 'Please enter a valid email',
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (username) {
          return /^[a-zA-Z0-9._-]+$/.test(username);
        },
        message: 'Username can only contain letters, numbers, periods, hyphens, and underscores',
      },
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      trim: true,
      minlength: [8, 'Password must be at least 8 characters long'],
      validate: {
        validator: function (password) {
          // Require at least one special character and one digit
          return /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/.test(password);
        },
        message: 'Password must contain at least one special character and one digit',
      },
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
      validate: {
        validator: function (phone) {
          return validator.isEmpty(phone) || validator.isMobilePhone(phone, 'any');
        },
        message: 'Please enter a valid phone number',
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
      validate: {
        validator: function (url) {
          return validator.isEmpty(url) || validator.isURL(url);
        },
        message: 'Please enter a valid image URL',
      },
    },
    country: {
      type: String,
      required: [true, 'Please enter your country'],
    },
    role: {
      type: String,
      required: [true, 'Please enter your role'],
      trim: true,
      enum: ['admin', 'freelancer', 'client'],
    },
    CvUrl: {
      type: String,
      required: false,
      validator: {
        validator: function (url) {
          return !!url && this.role === 'freelancer';
        },
        message: "Only users with the role 'freelancer' can add a CV URL",
      },
    },
    language: {
      type: [
        {
          id: { type: String, required: true },
          language: { type: String, required: true },
          level: { type: Number, required: true },
        },
      ],
      required: false,
      default: [],
    },
    education: {
      type: String,
      required: false,
      trim: true,
    },
    biography: {
      type: String,
      required: false,
      trim: true,
      validator: {
        validator: function (url) {
          return !!url && this.role === 'freelancer';
        },
        message: "Only users with the role 'freelancer' can add a Biography",
      },
    },
    company_name: {
      type: String,
      required: false,
      trim: true,
      validator: {
        validator: function (url) {
          return !!url && this.role === 'client';
        },
        message: "Only users with the role 'freelancer' can add a Biography",
      },
    },
    admin_rank: {
      type: String,
      required: false,
      trim: true,
      enum: ['administrator', 'customer service'],
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
