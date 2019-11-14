const expect = require('chai').expect;
const describe = require('mocha').describe;
const before = require('mocha').before;
const it = require('mocha').it;
const faker = require('faker');

const {
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
} = require('../dataManager');

const getRandomCustomerSync = () => {
    const obj = {};
    obj.firstName = faker.name.firstName();
    obj.lastName = faker.name.lastName();
    const email = `${obj.firstName}.${obj.lastName}@${faker.internet.domainName()}`;
    obj.email = email;

    return obj;
};


let seats;

before(async () => {
    seats = await getSeats();
});

const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
};

describe('Data Tests', () => {
    it('Can reserve seat', (done) => {
        const data = {};
        const seat = sample(seats);
        data.seat = seat;
        data.seat.status = 'RESERVED';
        data.customer = getRandomCustomerSync();
        setAssignedSeat(data)
            .then(result => {
                const obj = result.toObject({ getters: true });
                console.log(obj);
                expect(obj.customer.firstName).to.be.a('string');
                expect(obj.customer.lastName).to.be.a('string');
                expect(obj.customer.email).to.be.a('string');
                expect(obj.seat.number).to.be.a('string');
                expect(obj.seat.section).to.be.a('string');
                expect(obj.seat.venue).to.be.an('object');
                expect(obj.seat.status).to.be.equal('RESERVED');
                done()
            })
            .catch(e => {
                done(e)
            });
    });
    it('Can buy seat', (done) => {
      done();
    });

    it('Can get reserved seats', (done) => {

        getAssignedSeats('RESERVED')
            .then(result => {
                expect(result).to.be.an('array');
                done();
            })
            .catch(e => {
                done(e)
            });
    });

    it('Can get sold seats', (done) => {

        getAssignedSeats('SOLD')
            .then(result => {
                expect(result).to.be.an('array');
                expect(result.length).to.equal(0);
                done();
            })
            .catch(e => {
                done(e)
            });
    });
});