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
    
    type Query {
        venues: [Venue]
        venue(id: ID!): Venue
        soldSeats(venueId: ID!): [Seat]
        reservedSeats(venueId: ID!): [Seat]
        openSeats(venueId: ID!):[Seat]
    }
    type Mutation {
        reserveSeat(seat: SeatInput): Seat
        buySeat(seat: SeatInput): Seat
        releaseSeat(seat: SeatInput): Seat
    }

    type Subscription {
        onSeatReserved: SeatEvent
        onSeatSold: SeatEvent
        onSeatReleased: SeatEvent
    }
    type Venue {
        id: ID
        name: String
        address: String
        city: String
        state_province: String
        postal_code: String
        country: String
        seats: [Seat]
    }
    
    type Seat {
        id:ID
        number: String!
        section: String!
        status: SeatStatus!
        customer: Customer
    }

    input SeatInput {
        venueId: ID!
        """The seat number"""
        number: String!
        status: String
        customer: CustomerInput!
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
        message: String
        venueId: ID
        seatId: ID
        number: String!
        section: String
        status: String!
        changeDate: Date
    }
`;