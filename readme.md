# Seat Saver

A project that demonstrates how to implement high volume message streaming under GraphQL

Seat Saver will automatically inject preliminary data into the datastore upon startup.

# Running Seat Saver as a Docker Compose Application

**Step 1:** Clone the source into your host machine.

`git clone https://github.com/reselbob/seat-saver`

**Step 2:** Go to the project directory

`cd seat-saver`

**Step 3:** Spin up the `docker-compose` project

`docker-compose up`

Seat saver will be running on port `4000`.

# Running Seat Saver as a Standalone Application

TO BE PROVIDED

## Dependency services requires
* MongoDB
* Redis

### Setting the environment variable `MONGODB_URL`

### Setting Redis environment variables

**Setting `MESSAGE_BROKER_HOST`**

**Setting `MESSAGE_BROKER_PORT`** (optional)

## Understanding the Seat Saver API



### Venue

```graphql
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
```

### Seat

```graphql
  type Seat {
        id:ID
        number: String!
        section: String!
        status: SeatStatus!
        customer: Customer
    }
```

```graphql
    type Customer {
        firstName: String
        lastName: String
        email: String
    }
```

## Subscriptions and Mutations

### Reserving a Seat

Sample common query variable

```json
{
  "seat": {
    "venueId": "5dce2cabba1d1d320106525a",
    "number": "A0",
    "customer": {
      "firstName": "Gonzalo",
  		"lastName": "Considine",
  		"email": "Gonzalo.Considine@dagmar.name" 
    }
  }
}
```

***reserveSeat***
```graphql
mutation reserveSeat($seat: SeatInput!) {
  reserveSeat(seat: $seat) {
  	id
    number
    section
    status 
  }
}
```

***Output***

```json
{
  "data": {
    "reserveSeat": {
      "id": "5dce2cabba1d1d320106525b",
      "number": "A0",
      "section": "Section-A",
      "status": "RESERVED"
    }
  }
}
```

***onSeatReserved***

```graphql
subscription onSeatReserved{
  onSeatReserved{
    venueId
    message
    number
    section
    status
    seatId  
  }
}
```

***Output***

```json
{
  "data": {
    "onSeatReserved": {
      "venueId": "5dce2cabba1d1d320106525a",
      "message": "Reserving Seat",
      "number": "A0",
      "section": null,
      "status": "RESERVED",
      "seatId": null
    }
  }
}
```

### Buying a Seat

***buySeat***

```graphql
mutation buySeat($seat: SeatInput!) {
  buySeat(seat: $seat) {
  	id
    number
    section
    status 
  }
}
```

***Output***
```json
{
  "data": {
    "buySeat": {
      "id": "5dce2cabba1d1d320106525b",
      "number": "A0",
      "section": "Section-A",
      "status": "SOLD"
    }
  }
}
```

***onSeatSold***

```graphql
subscription onSeatSold{
  onSeatSold{
    venueId
    message
    number
    section
    status
    seatId
  }
}
```

***Output***
```json
{
  "data": {
    "onSeatSold": {
      "venueId": "5dce2cabba1d1d320106525a",
      "message": "Bought Seat",
      "number": "A0",
      "section": "Section-A",
      "status": "SOLD",
      "seatId": "5dce2cabba1d1d320106525b"
    }
  }
}
```
### Releasing a Seat

***releaseSeat***
```graphql
mutation releaseSeat($seat: SeatInput!) {
  releaseSeat(seat: $seat) {
  	id
    number
    section
    status 
  }
}
```
***Output***
```json
{
  "data": {
    "releaseSeat": {
      "id": "5dce2cabba1d1d320106525b",
      "number": "A0",
      "section": "Section-A",
      "status": "OPEN"
    }
  }
}
```
***onSeatReleased***

```graphql
subscription onSeatReleased{
  onSeatReleased{
    venueId
    message
    number
    section
    status
    seatId

  }
}
```

***Output***
```json
{
  "data": {
    "onSeatReleased": {
      "venueId": "5dce2cabba1d1d320106525a",
      "message": "Released Seat",
      "number": "A0",
      "section": "Section-A",
      "status": "OPEN",
      "seatId": "5dce2cabba1d1d320106525b"
    }
  }
}
```