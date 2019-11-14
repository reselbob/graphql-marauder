const mongoose = require('mongoose');
const seat = mongoose.Schema({
    number:{type: String, required: true},
    section:{type: String, required: true},
    status:{type: String, required: true},
    venue: {
        id: {type: String,required: true},
        name: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        state_province: {type: String, required: true},
        postal_code: {type: String, required: true},
        country: {type: String, required: true},
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Seat = mongoose.model('Seat', seat);

module.exports = Seat;