const Category = require('../models/category.model');

const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const existingCategory = await Category.findOne({ name: category });
    if (existingCategory) {
      return res.status(404).json({ message: 'Category already exists.' });
    }
    const newCategory = await Category.create({ name: category });
    return res.status(201).json({ newCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCategories = async (req, res, next) => {
    try {
      // Query the database for all Categories 
      const categories = await Category.find({})
      // If the operation is successful, send the array of Categories back in the response body as JSON
      return res.status(200).json({ categories });
    } catch (error) {
      // If there is an error, send a 500 status code with the error message in the response body as JSON
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  addCategory,
  getCategories
};
