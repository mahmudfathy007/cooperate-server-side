const Token = require('../models/token.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/sendEmail');
const User = require('../models/user.model');
const { generateAuthTokens, verifyToken, generateAccessToken } = require('../utils/Token');
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
    return res.status(400).json({ message: errorMessage });
  }
  const { firstname, lastname, username, password, role, country, email } = req.body;

  // Email already taken
  if (await User.isEmailTaken(email)) {
    return res.status(409).json({ message: 'Email already taken.' });
  }
  // Username is already taken
  if (await User.isUsernameTaken(req.body.username)) {
    return res.status(409).json({ message: 'Username already taken.' });
  }
  try {
    // create user
    const user = await User.create({
      first_name: firstname,
      last_name: lastname,
      username: username,
      password,
      role,
      email,
      country,
    });
    const tokens = await generateAuthTokens(user);
    sendEmail(email, tokens.access.token);
    return res.status(200).json({ message: 'User created successfully', user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'an error occurred in creating user', error: err });
  }
};

const confrimEmail = async (req, res) => {
  const { token } = req.params;
  try {
    // Verify token
    const verifiedToken = jwt.verify(token, config.jwt.secret);
    const userId = verifiedToken.sub;

    // Update emailVerified field
    await User.findByIdAndUpdate(userId, { isEmailVerified: true });

    // Redirect to the desired URL
    return res.redirect('http://localhost:3000/oauth');
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred while verifying email.', error: err });
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
    return res.status(400).json({ message: errorMessage });
  }
  const { email, password } = req.body;
  try {
    // search for user
    const user = await User.findOne({ email }).exec();

    // incorrect password or invalid email
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(422).json({ message: 'Incorrect email or password.' });
    }

    // generate tokens
    const tokens = await generateAuthTokens(user);

    // return tokens
    return res.status(200).json({
      accessToken: tokens.access.token,
      refreshToken: tokens.refresh.token,
      userId: user._id,
    });
  } catch (err) {
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
    return res.status(400).json({ message: errorMessage });
  }

  try {
    //extract refresh/access tokens
    const { refreshToken } = req.body;

    // find refresh/access tokens if exists
    const RemoveRefreshToken = await Token.findOne({ token: refreshToken }).exec();

    if (!RemoveRefreshToken) {
      return res.status(404).json({ error: 'Not Found' });
    }
    // remove refresh token/ access token
    await RemoveRefreshToken.remove();

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
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const receivedRefreshToken = req.body.refreshToken;
    if (!receivedRefreshToken) {
      return res.status(401).json({ message: 'Authorization failed' });
    }

    // 1 - find refresh-token in refreshToken model
    const foundedRefreshToken = await Token.findOne({ token: receivedRefreshToken }).exec();
    if (!foundedRefreshToken) {
      return res.status(404).json({ message: 'refreshToken not found in tokenDB!' });
    }

    // 2 - verify token
    const verifiedRefreshToken = await verifyToken(receivedRefreshToken);

    if (!verifiedRefreshToken) {
      return res.status(404).json({ message: 'refreshToken not found in tokenDB!' });
    }
    const user = await User.findOne({ _id: verifiedRefreshToken.user }).exec();

    // 3 - create new access token
    const newAccessToken = generateAccessToken(user);
    return res.status(200).json({ accessToken: newAccessToken.access.token });
  } catch (err) {
    return res.status(403).json({
      message: 'Refresh token expired',
    });
  }
};

module.exports = {
  register,
  authenticate,
  logout,
  refreshToken,
  confrimEmail,
};
