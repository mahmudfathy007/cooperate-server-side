const Job = require('../models/job.model');

const postJob = async (req, res) => {
  const { userId } = req.params;
  const { description, payment_type, project_length, category_id, experience_level, budget, title } = req.body;

  try {
    const newJob = await Job.create({
      description,
      payment_type,
      project_length,
      category_id,
      experience_level,
      budget,
      title,
      client_id: userId,
    });
    return res.status(201).json({ message: 'New Job created successfully', newJob });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getJobs = async (req, res, next) => {
  try {
    // Query the database for all Categories
    const jobs = await Job.find({});
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
    console.log('existingJob:', existingJob);
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

module.exports = {
  postJob,
  getJobs,
  deleteJob,
  updateJob,
};
