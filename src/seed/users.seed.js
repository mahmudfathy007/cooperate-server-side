const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Skill = require('../models/skill.model');
const Job = require('../models/job.model');

mongoose.connect(
  'mongodb+srv://MohamedHesham:rypdqPoSNDFVj2Hl@cluster0.sx0zxg0.mongodb.net/MlTest?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const NUM_FREELANCERS = 10;
const NUM_CLIENTS = 10;
const NUM_JOBS = 10;
const MIN_SKILLS_PER_CATEGORY = 1;
const MAX_SKILLS_PER_CATEGORY = 5;
const MIN_JOBS_PER_CLIENT = 1;
const MAX_JOBS_PER_CLIENT = 10;

async function createFreelancerAccounts() {
  try {
    // get categories and their skills from database
    const categories = await Category.find().populate({ path: 'skills', model: Skill });

    // create freelancers
    const freelancers = [];
    for (let i = 0; i < NUM_FREELANCERS; i++) {
      const user = await User.create({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'test@123',
        role: 'freelancer',
        country: faker.address.country(),
      });

      // add random skills to user
      const userSkills = [];
      const selectedCategories = faker.helpers.shuffle(categories).slice(0, 2); // select 2 random categories
      selectedCategories.forEach((category) => {
        const categorySkills = category.skills.map((skill) => skill._id);

        const numUserSkills = faker.datatype.number({ min: MIN_SKILLS_PER_CATEGORY, max: MAX_SKILLS_PER_CATEGORY });

        for (let k = 0; k < numUserSkills; k++) {
          const skill = faker.helpers.arrayElement(categorySkills);
          if (!userSkills.includes(skill)) {
            userSkills.push(skill);
          }
        }
      });

      user.categories = [...selectedCategories.map((category) => category._id)];
      user.skills = userSkills;
      await user.save();
      freelancers.push(user);
    }

    console.log(`${NUM_FREELANCERS} freelancer accounts were created successfully!`);
  } catch (error) {
    console.error(error);
  }
}
async function ShowResult() {
  const createdFreelancers = await User.find({ role: 'freelancer' })
    .populate({ path: 'skills', model: Skill })
    .populate({ path: 'categories', model: Category, populate: { path: 'skills', model: Skill } });

  for (const freelancer of createdFreelancers) {
    console.log(`Freelancer: ${freelancer.first_name} ${freelancer.last_name}`);

    console.log('Categories:');
    for (const category of freelancer.categories) {
      console.log(`- ${category.name}`);
    }

    console.log('Skills:');
    for (const skill of freelancer.skills) {
      console.log(`- ${skill.name}`);
    }

    console.log('-------------------');
  }
}
// ShowResult();
// createFreelancerAccounts();

async function createClientsAccount() {
  try {
    const categories = await Category.find().populate({ path: 'skills', model: Skill });

    const clients = [];
    for (let i = 0; i < NUM_CLIENTS; i++) {
      const user = await User.create({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'test@123',
        role: 'client',
        country: faker.address.country(),
      });
      clients.push(user);
      const job = await Job.create({
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraph(),
        budget: faker.datatype.number({ min: 100, max: 1000 }),
        duration: faker.datatype.number({ min: 1, max: 12 }),
        //add one category with random skills related to this category to the job
        category: [faker.helpers.arrayElement(categories)._id],
        //add number of skills to the job from the category skills list and make sure that the skills are unique
        client_id: user._id,
        payment_type: 'Fawry',
      });
      const selectedCategory = faker.helpers.arrayElement(categories);
      const categorySkills = selectedCategory.skills;
      const numJobSkills = faker.datatype.number({ min: MIN_SKILLS_PER_CATEGORY, max: MAX_SKILLS_PER_CATEGORY });
      const jobSkills = [];

      for (let k = 0; k < numJobSkills; k++) {
        const randomSkill = faker.helpers.arrayElement(categorySkills);
        if (!jobSkills.includes(randomSkill)) {
          jobSkills.push(randomSkill);
        }
      }

      job.category = selectedCategory._id;
      job.skills = jobSkills.map((skill) => skill._id);

      await job.save();

      user.jobs.push(job._id);
      await user.save();
    }
    console.log(`${NUM_CLIENTS} client accounts were created successfully!`);
  } catch (error) {
    console.error(error);
  }
}

async function Showfinalres() {
  const joooooooobs = await Job.find({})
    .populate({ path: 'skills', model: Skill })
    .populate({ path: 'category', model: Category, populate: { path: 'skills', model: Skill } });

  for (const job of joooooooobs) {
    console.log(`Job tittle: ${job.title}`);

    console.log('Categories:');
    console.log(`- ${job.category.name}`);

    console.log('Skills:');
    for (const skill of job.skills) {
      console.log(`- ${skill.name}`);
    }

    console.log('-------------------');
  }
}

// createClientsAccount();
Showfinalres();
