const User = require('../models/user.model');
const Joi = require('joi');
const { changePasswordSchema } = require('../utils/Validation');

const changePassword = async (req, res, next) => {
  const body = { body: req.body };
  // Validation using Joi to make sure passwords are provided and are not the same
  const { value, error } = Joi.compile(changePasswordSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(body);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ message: errorMessage });
  }
  // Destructure oldPassword and newPassword from request body
  const { oldPassword, newPassword, userId } = req.body;
  try {
    // Find user by ID
    const user = await User.findById(userId).exec();
    // If the user is not found, return a 404 status code and error message
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // If the old password provided does not match the current password, return a 422 status code
    if (!(await user.isPasswordMatch(oldPassword))) {
      return res.status(422).json({ message: 'Incorrect old password.' });
    }
    // Update the user's password and save changes to the database
    user.password = newPassword;
    await user.save();
    // Return a 200 status code and success message
    return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    // If there is an error during the process, return a 500 status code and error message
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    // Query the database for all users and exclude the password field from the results
    const users = await User.find({}).select('-password');
    // If the operation is successful, send the array of users back in the response body as JSON
    return res.status(200).json({ users });
  } catch (error) {
    // If there is an error, send a 500 status code with the error message in the response body as JSON
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res, next) => {
  // Destructure userId from request body
  const { userId } = req.params;
  try {
    // Find user by ID and exclude password field
    const user = await User.findById(userId).select('-password').exec();
    // If the user is not found, return a 404 status code and error message
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    } // Return user data
    return res.status(200).json({ user });
  } catch (err) {
    // If there is an error during the process, return a 500 status code and error message
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  changePassword,
  getUser,
  getUsers,
};
