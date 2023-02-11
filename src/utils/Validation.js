const Joi = require('joi');

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

const authenticateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const logoutSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
const refreshTokenSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
module.exports = {
  registerSchema,
  authenticateSchema,
  logoutSchema,
  refreshTokenSchema,
};
