'use strict';
const expect = require('chai').expect;
const describe = require('mocha').describe;
const before = require('mocha').before;
const it = require('mocha').it;
const {shutdown, seedSeats} = require('../index');
const uuidv4 = require('uuid/v4');
const faker = require('faker');

const getRandomCustomerSync = () => {
    const obj = {};
    obj.firstName = faker.name.firstName();
    obj.lastName = faker.name.lastName();
    const email = `${obj.firstName}.${obj.lastName}@${faker.internet.domainName()}`;
    obj.email = email;

    return obj;
};

const sample = (arr)=>{
    return arr[Math.floor(Math.random()* arr.length)]
};

const serverConfig = {serverUrl: 'http://localhost:4000/', subscriptionUrl: 'ws://localhost:4000/graphql'};
before (async () => {
    await seedSeats();
})

after((done) => {
    shutdown();
    done();
});

describe('GraphQL Basic Tests', () => {
    it('Can Assign Seat person via GraphQL', (done) => {
        const client = require('graphql-client')({
            url: 'http://localhost:4000'
        });
        client.query('query {reservedSeats { id } }')
            .then(function(body) {
                expect(body.data.reservedSeats).to.be.an('array');
                //return seat;
                done();
            });
    });
});