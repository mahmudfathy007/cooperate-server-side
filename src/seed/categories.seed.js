const mongoose = require('mongoose');
const Category = require('../models/category.model');
const Skill = require('../models/skill.model');
const data = require('./categories.json');

mongoose.connect(
  'mongodb+srv://MohamedHesham:rypdqPoSNDFVj2Hl@cluster0.sx0zxg0.mongodb.net/cooperate?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', async () => {
  //console.log('Connected to database');

  // Clear existing data
  await Category.deleteMany({});
  await Skill.deleteMany({});

  // Insert new data
  for (const categoryData of data) {
    const { name, skills } = categoryData;
    const skillsIds = [];

    for (const skillName of skills) {
      let skill = await Skill.findOne({ name: skillName });
      if (!skill) {
        // Create the skill if it doesn't exist in the database
        skill = await Skill.create({ name: skillName });
        skillsIds.push(skill._id);
      }
    }

    // Check if the category already exists in the database
    let category = await Category.findOne({ name });

    if (!category) {
      // Create the category if it doesn't exist in the database
      category = await Category.create({ name, skills: skillsIds });
    } else {
      // Push any new skills to the category's skills array
      const newSkills = skillsIds.filter((skillId) => !category.skills.includes(skillId));
      category.skills.push(...newSkills);
      await category.save();
    }
  }

  //console.log('Data seeded');
  mongoose.connection.close();
});