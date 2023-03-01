const { number, string, date } = require('joi');
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  client_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User',
  },
  payment_type: {
    type: String,
    required: [true, 'Please Choose your payment method'],
    enum: ['online', 'Fawry', 'paypal'],
  },
  project_length: {
    type: Date,
    required: true,
  },
  category: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
    default: [],
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      default: [],
    },
  ],
  experience_level: {
    type: String,
    required: true,
    enum: ['entry', 'intermediate', 'expert'],
  },
  budget: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
