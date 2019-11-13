const {gql} = require('apollo-server');

module.exports =  gql`
    """A custom scalar that returns time data as JavaScript Date object"""
    scalar Date
    scalar Object

    enum SeatStatus {
        OPEN
        RESERVED
        SOLD
    }

    input SeatInput {
        venueId: String
        number: String
        section: String
    }

    input CustomerInput {
        firstName: String
        lastName: String
        email: String
    }

    type Query {
        seats: [Seat]
        seat(id: ID!): Seat
        customers: [Customer]
        customer(id: ID!): Customer
    }
    type Mutation {
        reserveSeat(seat: AssignedSeatInput): Seat
        saveSeat(seat: AssignedSeatInput): Seat
        saveCustomer(customer: CustomerInput): Customer
    }

    type Subscription {
        onSeatReserved: SeatEvent
        onSeatSold: SeatEvent
        onSeatOpen: SeatEvent
    }
    type Venue {
        id: ID
        name: String
        address: String
        city: String
        state_province: String
        postal_code: String
        country: String
    }

    input AssignedSeatInput {
        seat: SeatInput
        customer: CustomerInput
    }
    type AssignedSeat {
        seat: Seat
        customer: Customer
    }

    type Seat {
        id:ID
        venue: Venue
        number: String
        section: String
        status: SeatStatus
    }

    input CustomerInput {
        firstName: String
        lastName: String
        email: String
    }
    
    type Customer {
        firstName: String
        lastName: String
        email: String
    }

    type SeatEvent {
        status: SeatStatus
        assignedSeat: AssignedSeat
        createDate: Date
        changeDate: Date
    }
`;