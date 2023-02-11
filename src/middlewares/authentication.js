const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  !authHeader && res.status(401).send('unauthorized');
  const token = authHeader.split(' ')[1];

  try {
    const verifiedToken = jwt.verify(token, config.jwt.secret);
    !verifiedToken && res.status(403).send('invalid token inside try');
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'invalid token!', error: err });
  }
};

module.exports = { authenticate };
