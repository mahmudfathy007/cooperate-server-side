const Category = require('../models/category.model');
const Skill = require('../models/skill.model');

const addSkill = async (req, res) => {
  const { skill, category } = req.body;
  try {
    const existingSkill = await Skill.findOne({ name: skill });
    if (existingSkill) {
      return res.status(404).json({ message: 'Skill already exists.' });
    }
    const newSkill = await Skill.create({ name: skill });
    const existingCategory = await Category.findOne({ name: category });
    if (existingCategory) {
      existingCategory.skills.push(newSkill);
      await existingCategory.save();
      return res.status(201).json({ existingCategory });
    }
    const newCategory = await Category.create({ name: category, skills: [newSkill] }); // Add the new skill to the skills array of the new category
    return res.status(201).json({ newCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSkills = async (req, res, next) => {
  try {
    // Query the database for all Categories
    const skills = await Skill.find({});
    // If the operation is successful, send the array of Categories back in the response body as JSON
    return res.status(200).json({ skills });
  } catch (error) {
    // If there is an error, send a 500 status code with the error message in the response body as JSON
    return res.status(500).json({ message: error.message });
  }
};

const deleteSkills = async (req, res) => {
  const { skill } = req.body;
  try {
    const existingSkill = await Skill.findOne({ name: skill });
    if (!existingSkill) {
      return res.status(404).json({ message: 'Skill does not exist.' });
    }
    await existingSkill.remove();
    return res.status(200).json({ message: 'Skill deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addSkill,
  getSkills,
  deleteSkills,
};
