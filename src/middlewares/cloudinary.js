const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: 'dpgype720',
  api_key: '676781998963594',
  api_secret: 'MLbfbcZkxXIYx9T0uPnsOhD1F_Q',
});

module.exports = {
  cloudinary,
};
