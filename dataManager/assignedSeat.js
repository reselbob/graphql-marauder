const mongoose = require('mongoose');
const assignedSeat = mongoose.Schema({
    seat: {
        id:{type: String, required: true},
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
        }
    },
    customer: {
        id:{type: String},
        firstName:{type: String, required: true},
        lastName:{type: String, required: true},
        email:{type: String, required: true},
    },
    dateSold: {type:Date},
    created: {
        type: Date,
        default: Date.now
    }
});

const AssignedSeat = mongoose.model('AssignedSeat', assignedSeat);

module.exports = AssignedSeat;