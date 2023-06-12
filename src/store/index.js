import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketsSlice';

export default configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});
