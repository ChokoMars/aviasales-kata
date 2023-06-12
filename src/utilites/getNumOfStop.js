const getNumOfStop = (ticket) =>
  ticket.segments
    .map((element) => element.stops.length)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

export default getNumOfStop;
