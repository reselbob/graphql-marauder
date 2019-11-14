const mongoose = require('mongoose');
const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if (!process.env.MONGODB_URL) throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');

const Customer = require('./customer');
const Seat = require('./seat');
const AssignedSeat = require('./assignedSeat');

const getCustomer = async (id) => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            if (!id) return new Customer();
            return Customer.findById(id);
        });
    return item;
};

const getCustomers = async () => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            return Customer.find({});
        });
    return item;
};

const setCustomer = async (data) => {
    const c = await Customer.findOne({email: data.email.toLowerCase()});
    //if the customer exists, leave
    if (c) return c;
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            return getCustomer()
        })
        .then(customer => {
            customer.firstName = data.firstName;
            customer.lastName = data.lastName;
            customer.email = data.email.toLowerCase();
            return customer.save();
        });
    return item;
};

const getAssignedSeat = async (id) => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            if (!id) return new AssignedSeat();
            return AssignedSeat.findById(id);
        });
    return item;
};

const getAssignedSeats = async (status) => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            if (!status) return AssignedSeat.find({});
            return AssignedSeat.find({
                "seat.status": status.toUpperCase()
            })
        })
        .then(result => {
            return result
        });
    return item;
};

const getSeat = async (id) => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            if (!id) return new Seat();
            return Seat.findById(id);
        });
    return item;
};

const getSeats = async () => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            return Seat.find({});
        });
    return item;
};

const setAssignedSeat = async (data) => {
    const customer = await setCustomer(data.customer);
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            return getAssignedSeat(data.id)
        })
        .then(assignedSeat => {
            assignedSeat.seat = data.seat.toObject({getters: true});
            assignedSeat.customer = customer.toObject({getters: true});
            return assignedSeat.save();
        });

    return item;
};

const setSeat = async (data) => {
    const item = await mongoose.connect(process.env.MONGODB_URL, moption)
        .then(result => {
            return getSeat()
        })
        .then(seat => {
            seat.section = data.section;
            seat.number = data.number;
            seat.status = data.status;
            seat.venue = data.venue;
            return seat.save();
        });
    return item;
};

module.exports = {
    getAssignedSeats,
    getAssignedSeat,
    setAssignedSeat,
    getCustomer,
    getCustomers,
    setCustomer,
    getSeat,
    getSeats,
    setSeat,
    Seat,
    Customer,
    AssignedSeat
};


