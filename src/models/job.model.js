const { number, string, date } = require('joi');
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    client_id: {
        type :Number,
        required: true,
    },
    payment_type: {
        type: String,
        required: [true, 'Please Choose your payment method'],
        enum: ['online', 'Fawry', 'paypal']
    },
    project_length: {
        type : Date,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    experiance_level: {
        type: String,
        required: true
    },
    budjet: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    }



});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;