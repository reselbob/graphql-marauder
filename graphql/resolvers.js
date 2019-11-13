const {getCustomer, getCustomers, setCustomer, getSeat, getSeats, setSeat} = require('../dataManager');
const {pubsub} = require('../dataManager')
const SEAT_STATUS_TOPIC = 'Seat_Status_Topic';

const getSeat = async (id)=> {
    return await getSeat(id);
};
const getSeats = async ()=> {
    return await getSeats();
};

const reserveSeat = async (seat)=> {
    seat.SeatStatus = 'RESERVED';
    pubsub.publish(SEAT_STATUS_TOPIC, { seatStatus: seat});
    return await setSeat(seat);
};
const saveSeat = async (seat)=> {
    seat.SeatStatus = 'SOLD';
    const result = await setSeat(seat);
    pubsub.publish(SEAT_STATUS_TOPIC, { seatStatus: result});
};

const getCustomer = async (id)=> {
    return await getCustomer(id);
};
const getCustomers = async ()=> {
    return await getCustomers();
};

const setCustomer = async (customer)=> {
    return await setCustomer(customer);
};



module.exports = {
    Object: {
        __parseValue(value) {
            return JSON.parse(value)
        },
        __serialize(value) {
            return value;
        }
    },
    Date: {
        __parseValue(value) {
            return new Date(value); // value from the client
        },
        __serialize(value) {
            return value;
        }
    },
    Query: {
        seats: async () => {return await getSeats()},
        seat: async (parent, args, context) => {
            if(args.id && args.id.length > 0) return await getSeat(args.id);
        },
        customers: async () => {return await getCustomers()},
        customer: async (parent, args, context) => {
            if(args.id && args.id.length > 0) return await getCustomer(args.id);
        }
    },
    Mutation: {
        saveSeat:  async (parent, args) => {
            return await saveSeat(args.seat);
        },

        reserveSeat:  async (parent, args) => {
            return await reserveSeat(args.seat);
        }
    },
    Subscription: {
        onSeatOpen: {
            subscribe: () => pubsub.asyncIterator(SEAT_STATUS_TOPIC)
        },
        onSeatReserved: {
            subscribe: () => pubsub.asyncIterator(SEAT_STATUS_TOPIC)
        },
        onSeatSole: {
            subscribe: () => pubsub.asyncIterator(SEAT_STATUS_TOPIC)
        },
    }
};