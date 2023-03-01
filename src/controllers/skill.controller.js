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

module.exports = {
  addSkill,
};
