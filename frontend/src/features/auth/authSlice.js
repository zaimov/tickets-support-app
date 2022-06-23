import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storate
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkApi) => {
    try {
      return await authService.register(user)
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return thunkApi.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkApi) => {
    try {
      return await authService.login(user)
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return thunkApi.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (user, thunkApi) => {
    await authService.logout()
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.user = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer