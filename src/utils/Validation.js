const Joi = require('joi');

// Validation schema for user registration
const registerSchema = {
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    repeat_password: Joi.ref('password'),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    country: Joi.string().required(),
    role: Joi.string().valid('client', 'freelancer', 'admin'),
  }),
};

// Validation schema for user authentication
const authenticateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

// Validation schema for user logout
const logoutSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

// Validation schema for refreshing user access token
const refreshTokenSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

// Validation schema for changing user password
const changePasswordSchema = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().not(Joi.ref('oldPassword')).messages({
      'any.invalid': 'New password must not be the same as old password',
    }),
    userId: Joi.string().required(),
  }),
};

module.exports = {
  registerSchema,
  authenticateSchema,
  logoutSchema,
  refreshTokenSchema,
  changePasswordSchema,
};
