const mongoose = require('mongoose');

const Category = require('../models/category.model');

const Skill = require('../models/skill.model');
const data = require('./categories.json');

mongoose.connect(
  'mongodb+srv://MohamedHesham:rypdqPoSNDFVj2Hl@cluster0.sx0zxg0.mongodb.net/MlTest?retryWrites=true&w=majority',
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

    const skillsIds = await Promise.all(
      skills.map(async (skillName) => {
        let skill = await Skill.findOne({ name: skillName });
        if (!skill) {
          skill = await Skill.create({ name: skillName });
        }
        return skill._id;
      })
    );

    await Category.create({ name, skills: skillsIds });
  }

  //console.log('Data seeded');
  mongoose.connection.close();
});
