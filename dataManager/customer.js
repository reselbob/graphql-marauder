const mongoose = require('mongoose');
const customer = mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('Customer', customer);

module.exports = Customer;