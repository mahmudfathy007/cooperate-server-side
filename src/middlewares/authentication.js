const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('unauthorized');
  }
  const token = authHeader.split(' ')[1];

  try {
    const verifiedToken = jwt.verify(token, config.jwt.secret);
    if (!verifiedToken) {
      return res.status(403).send('invalid token.');
    }
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(403).json({ message: 'invalid token!', error: err });
  }
};

module.exports = { authenticate };
