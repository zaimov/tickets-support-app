import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from "../tickets/ticketService";
import {register} from "../auth/authSlice";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return thunkApi.rejectWithValue(message)
    }
  }
)

// Get tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return thunkApi.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, state => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.user = action.payload
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTickets.pending, state => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer