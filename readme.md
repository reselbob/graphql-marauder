# Seat Saver

A project that demonstrates how to implement high volume message streaming under GraphQL


## Subscriptions and Mutations

### Reserving a Seat

Sample common query variable

```
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
```
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

```
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

```
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

```
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

```
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
```
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

```
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
```
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
```
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
```
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

```
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
```
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