const Job = require('../models/job.model');
const Skill = require('../models/skill.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');

const postJob = async (req, res) => {
  const { userId } = req.params;
  const { description, payment_type, skills, project_length, category_name, experience_level, budget, title } = req.body;
  try {
    const skillObjects = await Promise.all(
      skills.map(async (skillName) => {
        let skill = await Skill.findOne({ name: skillName });
        if (!skill) {
          skill = await Skill.create({ name: skillName });
        }
        return skill;
      })
    );

    const user = await User.findById(userId);
    const category = await Category.findOne({ name: category_name });
    if (!category) {
      return res.status(404).json({ message: 'No category found.' });
    }
    const newJob = await Job.create({
      description,
      payment_type,
      project_length,
      category: category._id,
      skills: skillObjects,
      experience_level,
      budget,
      title,
      client_id: userId,
    });
    user.jobs.push(newJob);
    await user.save();
    return res.status(201).json({ message: 'New Job created successfully', newJob });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getJobs = async (req, res, next) => {
  try {
    // Query the database for all Categories
    const jobs = await Job.find();
    // If the operation is successful, send the array of Categories back in the response body as JSON
    return res.status(200).json({ jobs });
  } catch (error) {
    // If there is an error, send a 500 status code with the error message in the response body as JSON
    return res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  const { userId } = req.params;
  const { jobId } = req.body;
  try {
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ message: 'Job does not exist.' });
    }
    if (userId === existingJob.client_id.toString()) {
      await existingJob.remove();
      return res.status(200).json({ message: 'Job deleted successfully.' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const isDefinedAndNotEmpty = (value) => {
  return value !== '' && !!value;
};
const updateJob = async (req, res) => {
  const { userId } = req.params;
  const { jobId, new_description, new_payment_type, new_project_length, new_experience_level, new_budget, new_title } =
    req.body;

  try {
    const existingJob = await Job.findById(jobId);
    if (userId === existingJob.client_id.toString()) {
      if (isDefinedAndNotEmpty(new_title)) {
        existingJob.title = new_title;
      }
      if (isDefinedAndNotEmpty(new_description)) {
        existingJob.description = new_description;
      }
      if (isDefinedAndNotEmpty(new_payment_type)) {
        existingJob.payment_type = new_payment_type;
      }
      if (isDefinedAndNotEmpty(new_project_length)) {
        existingJob.project_length = new_project_length;
      }
      if (isDefinedAndNotEmpty(new_experience_level)) {
        existingJob.experience_level = new_experience_level;
      }
      if (isDefinedAndNotEmpty(new_budget)) {
        existingJob.budget = new_budget;
      }

      await existingJob.save();
      return res.status(200).json({ message: 'Job updated successfully.', existingJob });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId)
      .populate({
        path: 'category',
        select: 'name',
        model: Category,
      })
      .populate({
        path: 'skills',
        select: 'name',
        model: Skill,
      });
    return res.status(200).json({ job });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postJob,
  getJobs,
  deleteJob,
  updateJob,
  getJob,
};
