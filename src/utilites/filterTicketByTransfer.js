import getNumOfStop from './getNumOfStop';

const filterTicketByTransfer = (ticket, showAllTickets, valueFilterTransfer) => {
  if (!showAllTickets) {
    return valueFilterTransfer.includes(getNumOfStop(ticket));
  }
  return true;
};
export default filterTicketByTransfer;
