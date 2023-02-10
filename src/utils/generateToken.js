const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');
const config = require('../config/config');
const { tokenTypes } = require('../config/tokens');
const moment = require('moment');

// Generate Token
const generateTokens = async (userId, expires, type, secret = config.jwt.secret) => {
  console.log(userId, expires, type);
  try {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    // create access token and refresh token
    const token = jwt.sign(payload, secret);

    const saveToken = await Token.create({ token, user: userId, expires: expires.toDate(), type });
    return saveToken;
    
  } catch (err) {
    return Promise.reject('err in generate tokens :', err);
  }
};

// Verify Token
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  console.log(payload);
  const tokenFound = await Token.findOne({ token, type, user: payload.sub });
  if (!tokenFound) {
    throw new Error('Token not found');
  }
  return tokenFound;
};
// Auth Token
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = await generateTokens(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = await generateTokens(user.id, refreshTokenExpires, tokenTypes.REFRESH);

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

module.exports = { generateTokens, verifyToken, generateAuthTokens };
