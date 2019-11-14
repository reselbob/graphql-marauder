const {getAssignedSeats, getAssignedSeat, setAssignedSeat, getCustomer, getCustomers, setCustomer, getSeat, getSeats, setSeat, Seat, Customer, AssignedSeat} = require('../dataManager');
const {pubsub} = require('../messageBroker');
const SEAT_STATUS_TOPIC = 'Seat_Status_Topic';

const _getSeat = async (id)=> {
    return await getSeat(id);
};
const _getSeats = async ()=> {
    return await getSeats();
};

const _reserveAssignedSeat = async (data)=> {
    const assignedSeat = await getAssignedSeat(data.id);
    assignedSeat.seat = data.seat;
    assignedSeat.seat.SeatStatus = 'RESERVED';

    //save the customer
    const cust = await _setCustomer(data.customer);
    assignedSeat.customer = cust;

    //do the seat assignment
    await pubsub.publish(SEAT_STATUS_TOPIC, { status: 'RESERVED', message: 'Reserving Seat', assignedSeat: assignedSeat});
    const result = await setAssignedSeat(assignedSeat);
    await pubsub.publish(SEAT_STATUS_TOPIC, {status: 'RESERVED',  message: 'Reserved Assigned', assignedSeat: result});

    return result;
};
const _saveSeat = async (seat)=> {
    seat.SeatStatus = 'OPEN';
    const result = await setSeat(seat);
    await pubsub.publish(SEAT_STATUS_TOPIC, { seat: result});
    return result;
};

const _buyAssignedSeat = async (id)=> {
    //get the seat
    const assignedSeat  = await getAssignedSeat(id)
    //change the seat status
    assignedSeat.seat.status = 'SOLD';
    assignedSeat.dateSold = new Date();


    //save the customer
    const cust = await _setCustomer(assignedSeat.customer);
    assignedSeat.customer = cust.id;
    await pubsub.publish(SEAT_STATUS_TOPIC, { status: 'Sold', message: 'Buying Seat', assignedSeat: assignedSeat});
    const result = await assignedSeat.save();
    await pubsub.publish(SEAT_STATUS_TOPIC, { status: 'Sold', message: 'Bought Seat', assignedSeat: result});
};
const _getCustomer = async (id)=> {
    return await getCustomer(id);
};
const _getCustomers = async ()=> {
    return await getCustomers();
};

const _setCustomer = async (customer)=> {
    return await setCustomer(customer);
};

const _getReservedSeats = async ()=> {
    return await getAssignedSeats('RESERVED');
};

const _getSoldSeats = async ()=> {
    return await getAssignedSeats('SOLD');
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
        soldSeats: async () => {return await _getSoldSeats()},
        reservedSeats: async () => {return await _getReservedSeats()},
        seats: async () => {return await _getSeats()},
        seat: async (parent, args, context) => {
            if(args.id && args.id.length > 0) return await _getSeat(args.id);
        },
        customers: async () => {return await _getCustomers()},
        customer: async (parent, args, context) => {
            if(args.id && args.id.length > 0) return await _getCustomer(args.id);
        }
    },
    Mutation: {
        saveSeat:  async (parent, args) => {
            return await _saveSeat(args.seat);
        },
        reserveAssignedSeat:  async (parent, args) => {
            return await _reserveAssignedSeat(args.assignedSeat);
        },
        saveCustomer:  async (parent, args) => {
            return await _setCustomer(args.customer);
        },
        buyAssignedSeat:  async (parent, args) => {
            return await _buyAssignedSeat(args.assignedSeat);
        }
    },
    Subscription: {
        onSeatOpen: {
            subscribe: () => pubsub.asyncIterator(SEAT_STATUS_TOPIC)
        },
        onSeatReserved: {
            subscribe: () => pubsub.asyncIterator(SEAT_STATUS_TOPIC)
        },
        onSeatSold: {
            subscribe: () => pubsub.asyncIterator(SEAT_STATUS_TOPIC)
        },
    }
};