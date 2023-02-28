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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
    },
    experiance_level: {
        type: String,
        required: true,
        enum: ['casas', 'saddas', 'dasdas']
    },
    budjet: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    }



});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;