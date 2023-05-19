const { number, string, date } = require('joi');
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    payment_type: {
      type: String,
      // required: [true, 'Please Choose your payment method'],
      enum: ['online', 'Fawry', 'paypal'],
    },
    project_length: {
      type: Date,
      // required: true,
    },
    category: {
      // required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
    },
    skills: [
      {
        // required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Skill',
      },
    ],

    experience_level: {
      type: String,
      // required: true,
      enum: ['entry', 'intermediate', 'expert'],
    },
    budget: {
      type: Number,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    Payment_Info: {
      card_number: String,
      CVV: String,
      name_on_card: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
