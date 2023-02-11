const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');
const config = require('../config/config');
const { tokenTypes } = require('../config/tokens');
const moment = require('moment');

// Generate Token
const generateTokens = (userId, expires, type, role, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
    role,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type) => {
  const newToken = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
  });
  return newToken;
};
// Verify Token
const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);

  const tokenFound = await Token.findOne({ token, user: payload.sub }).exec();
  if (!tokenFound) {
    throw new Error('Token not found');
  }
  return tokenFound;
};

// Auth Token
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateTokens(user.id, accessTokenExpires, tokenTypes.ACCESS, user.role);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateTokens(user.id, refreshTokenExpires, tokenTypes.REFRESH, user.role);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
// Access Token
const generateAccessToken = (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateTokens(user.id, accessTokenExpires, tokenTypes.ACCESS, user.role);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

module.exports = { generateAccessToken, generateTokens, verifyToken, generateAuthTokens };
