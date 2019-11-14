const uuidv4 = require('uuid/v4');
const {getSeats, setSeat} = require('../dataManager');

const uuid = uuidv4();
const getVenueSync = {
    id: uuid,
    name: 'Happyville Community Stadium',
    address: '123 Happy Street',
    city: 'Des Moines',
    state_province: 'IA',
    postal_code: '50311',
    country: 'USA'
};

const createSeats = async () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        for (let j = 0; j < 21; j++) {
            const seat = {};
            seat.number = letter + j;
            seat.section = 'Section-' + letter;
            seat.status = 'OPEN';
            seat.venue = getVenueSync;
            await setSeat(seat);
        }
    }
};


const seedSeats = async () => {
    const seats = await getSeats();
    if (!seats || seats.length < 1) {
        console.log({message: 'Start Seeding Seats', date: new Date()});
        await createSeats();
        console.log({message: 'End Seeding Seats', date: new Date()});
    } else {
        console.log({message: 'Seats Already Seeded', date: new Date()})
    }
};

module.exports = {seedSeats};

