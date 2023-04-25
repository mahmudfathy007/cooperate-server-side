const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Skill = require('../models/skill.model');
const Job = require('../models/job.model');
const Project = require('../models/project.model');
mongoose.connect(
  'mongodb+srv://MohamedHesham:rypdqPoSNDFVj2Hl@cluster0.sx0zxg0.mongodb.net/MlTest?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const NUM_FREELANCERS = 100;
const NUM_CLIENTS = 10;

const MIN_SKILLS_PER_CATEGORY = 1;
const MAX_SKILLS_PER_CATEGORY = 5;
const MIN_JOBS_PER_CLIENT = 10;
const MAX_JOBS_PER_CLIENT = 15;

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
    let numJobsCreated = 0;

    for (let i = 0; i < NUM_CLIENTS; i++) {
      const numJobs = faker.datatype.number({ min: MIN_JOBS_PER_CLIENT, max: MAX_JOBS_PER_CLIENT });
      const user = await User.create({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'test@123',
        role: 'client',
        country: faker.address.country(),
      });

      const jobs = [];
      for (let j = 0; j < numJobs; j++) {
        const job = await Job.create({
          title: faker.name.jobTitle(),
          description: faker.lorem.paragraph(),
          budget: faker.datatype.number({ min: 100, max: 1000 }),
          duration: faker.datatype.number({ min: 1, max: 12 }),
          category: [faker.helpers.arrayElement(categories)._id],
          payment_type: 'Fawry',
          status: 'false',
          client_id: user._id,
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
        jobs.push(job);
        numJobsCreated++;
      }

      user.jobs = jobs.map((job) => job._id);
      await user.save();
      clients.push(user);
    }
    console.log(`${NUM_CLIENTS} client accounts were created successfully with ${numJobsCreated} jobs!`);

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

      const userSkills = [];
      const selectedCategories = faker.helpers.shuffle(categories).slice(0, 2);
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

async function assignJobsToFreelancers() {
  try {
    const projectData = [];

    const jobs = await Job.find({ status: false }).populate('client_id').populate({ path: 'skills', model: Skill });
    const freelancers = await User.find({ role: 'freelancer' })
      .populate({ path: 'skills', model: Skill })
      .populate({ path: 'categories', model: Category });

    // find all jobs that match the freelancer's skills and categories
    for (let i = 0; i < freelancers.length; i++) {
      const freelancer = freelancers[i];

      const availableJobs = jobs.filter((job) => job.status === false);

      if (availableJobs.length === 0) {
        continue;
      }

      const matchingJobs = availableJobs.filter((job) => {
        const jobSkills = job.skills.map((skill) => skill._id.toString());
        const userSkills = freelancer.skills.map((skill) => skill._id.toString());
        const userCategories = freelancer.categories.map((category) => category._id.toString());

        const hasMatchingSkills = jobSkills.some((skill) => userSkills.includes(skill));

        return hasMatchingSkills;
      });

      // if there are no matching jobs, continue to the next freelancer
      if (matchingJobs.length === 0) {
        continue;
      }

      // select a random job from the matching jobs
      const selectedJob = matchingJobs[Math.floor(Math.random() * matchingJobs.length)];

      // update job status and assign to freelancer
      selectedJob.status = true;
      // selectedJob.freelancer_id = freelancer._id;
      await selectedJob.save();

      // create project document
      const project = await Project.create({
        job: selectedJob._id,
        client_id: selectedJob.client_id._id,
        Freelancer_id: freelancer._id,
        project_status: 'Complete',
      });
      

      projectData.push(project);
    }

    console.log(`${projectData.length} projects were created successfully!`);
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

async function showMatchingFreelancers() {
  const jobs = await Job.find({}).populate({ path: 'skills', model: Skill }).populate({ path: 'category', model: Category });

  for (const job of jobs) {
    console.log(`Job title: ${job.title}`);
    console.log('Matching job skills:');
    for (const skill of job.skills) {
      console.log(`- ${skill.name}`);
    }

    const matchingFreelancers = await User.find({ role: 'freelancer' })
      .populate({ path: 'skills', model: Skill })
      .populate({ path: 'categories', model: Category })
      .find({
        $and: [
          { skills: { $in: job.skills.map((skill) => skill._id) } },
          { categories: job.category._id },
        ],
      });

    console.log('Matching freelancers:');

    for (const freelancer of matchingFreelancers) {
      console.log(`- ${freelancer.first_name}:`);

      console.log('  Freelancer skills:');
      for (const skill of freelancer.skills) {
        if (job.skills.some((jobSkill) => jobSkill._id.equals(skill._id))) {
          console.log(`  - ${skill.name}`);
        }
      }

      console.log('-------------------');
    }
  }
}



// createClientsAccount();
// assignJobsToFreelancers();
// Showfinalres();
showMatchingFreelancers();
