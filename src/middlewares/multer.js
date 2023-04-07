const multer = require('multer');

// Set up storage for CVs
const cvStorage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'E:/cooperate-server-side/src/uploads/CV');
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});

// Set up storage for CVs
const projectStorage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'E:/cooperate-server-side/src/uploads/CV');
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});

// Set up storage for profile pictures
const imageStorage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'E:/cooperate-server-side/src/uploads/images');
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});

// Define Multer upload middleware for CVs
const uploadCV = multer({
  storage: cvStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
}).single('cv');

// Define Multer upload middleware for profile pictures
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif') {
      return cb(new Error('Only JPEG, PNG, and GIF images are allowed'));
    }
    cb(null, true);
  },
}).single('image');

// Define Multer upload middleware for projects
const uploadProject = multer({
  storage: projectStorage,
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
}).single('project');

// Function to handle file uploads with Multer
function handleFileUpload(middleware) {
  return function (req, res, next) {
    middleware(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
}
module.exports = {
  handleFileUpload,
  uploadCV,
  uploadImage,
  uploadProject,
};
