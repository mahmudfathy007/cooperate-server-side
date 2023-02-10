const { tokenTypes } = require('../config/tokens');
const User = require('../models/user.model');
const { generateAuthTokens } = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
  const { firstname, lastname, username, password, type, country, email } = req.body;
  if (await User.isEmailTaken(email)) {
    res.status(409).json({ error: 'Email already taken' });
  }
  if (await User.isUsernameTaken(req.body.username)) {
    res.status(409).json({ error: 'Username already taken' });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name: firstname,
      last_name: lastname,
      username: username,
      password: hashedPassword,
      type: type,
      country: country,
      email: email,
    });
    const tokens = await generateAuthTokens(user);
    res.status(200).json({ user, tokens });
  } catch (err) {
    res.status(500).json({ message: 'an error occurred in creating user', error: err });
  }
};

module.exports = {
  register,
};
