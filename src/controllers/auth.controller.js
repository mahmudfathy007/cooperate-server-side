const { tokenTypes } = require('../config/tokens');
const Token = require('../models/token.model');
const User = require('../models/user.model');
const { generateAuthTokens, verifyToken, generateAccessToken } = require('../utils/Token');
const bcrypt = require('bcryptjs');
const { registerSchema, authenticateSchema, logoutSchema, refreshTokenSchema } = require('../utils/Validation');
const Joi = require('joi');

const register = async (req, res, next) => {
  const body = { body: req.body };

  // Validate Input
  const { value, error } = Joi.compile(registerSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(body);
  // Handle errors
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  const { firstname, lastname, username, password, type, country, email } = req.body;

  // Email already taken
  if (await User.isEmailTaken(email)) {
    return res.status(409).json({ error: 'Email already taken' });
  }
  // Username is already taken
  if (await User.isUsernameTaken(req.body.username)) {
    return res.status(409).json({ error: 'Username already taken' });
  }
  try {
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      first_name: firstname,
      last_name: lastname,
      username: username,
      password: hashedPassword,
      type: type,
      country: country,
      email: email,
    });

    return res.status(200).json({ message: 'User created successfully', user });
  } catch (err) {
    return res.status(500).json({ message: 'an error occurred in creating user', error: err });
  }
};

const authenticate = async (req, res) => {
  const body = { body: req.body };

  // validate input
  const { value, error } = Joi.compile(authenticateSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(body);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  const { email, password } = req.body;
  try {
    // search for user
    const user = await User.findOne({ email }).exec();

    // incorrect password or invalid email
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }

    // generate tokens
    const tokens = await generateAuthTokens(user);

    // return tokens
    return res.status(200).json({ message: 'Login successfully', user, tokens });
  } catch (error) {
    return res.status(500).json({ message: 'an error occurred in authenticating user', error: err });
  }
};
const logout = async (req, res) => {
  const body = { body: req.body };

  // validate input
  const { value, error } = Joi.compile(logoutSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(body);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  try {
    //extract refresh/access tokens
    const { refreshToken, accessToken } = req.body;

    // find refresh/access tokens if exists
    const RemoveAccessToken = await Token.findOne({ token: accessToken, type: tokenTypes.ACCESS }).exec();
    const RemoveRefreshToken = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH }).exec();

    if (!RemoveAccessToken || !RemoveRefreshToken) {
      return res.status(404).json({ error: 'Not Found' });
    }
    // remove refresh token/ access token
    (await RemoveAccessToken.remove()) && (await RemoveRefreshToken.remove());

    // log the user out
    return res.status(200).json({ message: 'logged out successfully' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const refreshToken = async (req, res) => {
  const body = { body: req.body };

  // validate input
  const { value, error } = Joi.compile(refreshTokenSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(body);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  try {
    // extract refresh token
    const { refreshToken } = req.body;

    // verify token
    if (!refreshToken) {
      return res.status(401).json({ error: 'Authorization failed' });
    }

    const foundedRefreshToken = await Token.findOne({ token: refreshToken }).exec();

    if (!foundedRefreshToken) {
      return res.status(404).json({ error: 'refreshToken not found in tokenDB!' });
    }

    const verifiedRefreshToken = await verifyToken(refreshToken, tokenTypes.REFRESH);
    if (!verifiedRefreshToken) {
      return res.status(401).json({ error: 'Unauthorized action' });
    }

    // search if user exist having this refresh token
    const user = await User.findOne({ _id: foundedRefreshToken.user }).exec();

    const oldAccessToken = await Token.findOne({ user: user.id, type: tokenTypes.ACCESS }).exec();

    if (!user) {
      throw new Error();
    }
    // remove expired token
    oldAccessToken.remove();
    // create new one
    const newAccessToken = await generateAccessToken(user);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = {
  register,
  authenticate,
  logout,
  refreshToken,
};
