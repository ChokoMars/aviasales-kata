/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import getTotalFlyDuration from '../utilites/getTotlaFlyDuration';
import getCookie from '../utilites/getCookie';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${getCookie('searchId')}`);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    valueFilterTransfer: [],
    showAllTickets: true,
    numShowTicket: 5,
    isLoading: false,
    error: false,
    searchId: false,
    stopFetch: false,
    fetchStatus500: 0,
  },
  reducers: {
    showMoreTicket(state) {
      state.numShowTicket += 5;
    },

    sortTicketByPrice(state) {
      const filterTickets = current(state.tickets).slice();
      state.tickets = filterTickets.sort((previous, next) => (previous.price > next.price ? 1 : -1));
    },

    sortTicketByDuration(state) {
      // снимок массива билетов
      const filterTickets = current(state.tickets).slice();
      // сортировка и запись обратно в стейт
      state.tickets = filterTickets.sort((previous, next) =>
        getTotalFlyDuration(previous) > getTotalFlyDuration(next) ? 1 : -1
      );
    },

    sortTicketOptimal(state) {
      const filterTickets = current(state.tickets).slice();
      state.tickets = filterTickets.sort((previous, next) =>
        getTotalFlyDuration(previous) + previous.price > getTotalFlyDuration(next) + next.price ? 1 : -1
      );
    },

    switchFilterAll(state, action) {
      state.showAllTickets = action.payload;
    },

    setValueFilterTicket(state, action) {
      if (action.payload.isChecked) {
        state.valueFilterTransfer.push(action.payload.filterValue);
      } else {
        state.valueFilterTransfer = state.valueFilterTransfer.filter((item) => item !== action.payload.filterValue);
      }
    },
  },
  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [fetchTickets.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },

    [fetchSearchId.fulfilled]: (state, action) => {
      document.cookie = `searchId = ${action.payload.searchId}`;
      state.searchId = true;
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      state.stopFetch = action.payload.stop;
      state.isLoading = !action.payload.stop;
    },

    [fetchSearchId.rejected]: (state) => {
      state.error = true;
    },

    [fetchTickets.rejected]: (state, action) => {
      if (action.payload === '500') {
        state.fetchStatus500 += 1;
      } else {
        state.isLoading = false;
        state.error = true;
      }
    },
  },
});

export const {
  showMoreTicket,
  sortTicketByPrice,
  sortTicketByDuration,
  sortTicketOptimal,
  setValueFilterTicket,
  switchFilterAll,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
