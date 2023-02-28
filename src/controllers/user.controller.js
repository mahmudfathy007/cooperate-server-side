const User = require('../models/user.model');
const Joi = require('joi');
const { changePasswordSchema } = require('../utils/Validation');
const {job} = require ('../models/job.model');
const sendEmail = require('../services/sendEmail');
const Job = require('../models/job.model');

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

const updateUser = async (req, res) => {
  const { new_first_name, new_last_name, new_email  , new_address  ,
     new_phone , new_imageUrl ,new_CvUrl, new_education , new_biography ,
      new_company_name , new_country , new_language} = req.body;

    const { userId } = req.params;
    
    try{

      const user = await User.findById(userId).exec();

      if(new_first_name != '' && !!new_first_name){
        user.first_name = new_first_name
      }
      if(new_last_name != '' && !!new_last_name){
        user.last_name = new_last_name
      }
      if(new_email != '' && !!new_email){
        user.new_email = new_email
        let message = `<a href=".">Please Click Here To Update Your Email</a>`
        sendEmail(new_email , message)
      }
      if(new_address!= '' &&!!new_address){
        user.address = new_address
      }
      if(new_phone!= '' && !!new_phone){
        user.phone = new_phone
      }
      if(new_country != '' &&!!new_country){
        user.country = new_country
      }
      if(new_imageUrl != '' &&!!new_imageUrl){
        user.imageUrl = new_imageUrl
      }
      if(new_education != '' &&!!new_education){
        user.education = new_education
      }
      if(new_language != '' &&!!new_language){
        user.language = new_language
      }
      if(new_CvUrl!= '' &&!!new_CvUrl && user.role ==='freelancer'){
        user.CvUrl = new_CvUrl
      }
      if(new_biography!= '' &&!!new_biography ==='freelancer'){
        user.biography = new_biography
      }
      if(new_company_name!= '' &&!!new_company_name ==='client'){
        user.company_name = new_company_name
      }
    }
    catch(err){
      return res.status(500).json({ message: err.message });
    }
    
    
   
      await user.save();
      return res.status(200).json({ message: 'User updated successfully' });
    
  
    
  

}



  
module.exports = {
  changePassword,
  getUser,
  updateUser,
  getUsers,
};
