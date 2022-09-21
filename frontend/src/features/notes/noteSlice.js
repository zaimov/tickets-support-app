import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import noteService from "./noteService";
import {getTicket} from "../tickets/ticketSlice";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return thunkApi.rejectWithValue(message)
    }
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, state => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer