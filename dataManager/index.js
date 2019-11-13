const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');

const Customer = require('./customer');
const Seat = require('./seat');

const getCustomer= async (id) =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            if(!id)return new Reservation();
            return Customer.findById(id);
        });
    return item;
};

const getCustomers = async () =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return Customer.find({});
        });
    return item;
};

const setCustomer = async (data) =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return getCustomer()
        })
        .then(customer => {
            customer.firstName = data.firstName;
            customer.lastName = data.lastName;
            customer.email = data.email;
            return customer.save();
        });
    return item;
};

const getSeat= async (id) =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            if(!id)return new Seat();
            return Seat.findById(id);
        });
    return item;
};

const getSeats = async () =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return Seat.find({});
        });
    return item;
};

const setSeat = async (data) =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return getSeat()
        })
        .then(seat => {
            seat.section = data.section;
            seat.number = data.number;
            seat.status = data.status;
            seat.venue = {};
            seat.venue.name= data.venue.name;
            seat.venue.address= data.venue.address;
            seat.venue.city= data.venue.city;
            seat.venue.state_province= data.venue.state_province;
            seat.venue.postal_code= data.venue.postal_code;
            seat.venue.country= data.venue.country;
            return seat.save();
        });
    return item;
};

module.exports = {getCustomer, getCustomers, setCustomer, getSeat, getSeats, setSeat};


