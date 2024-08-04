import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

interface AuthState {
  isAuthenticated: boolean | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: null,
  loading: false,
  error: null
}

// Define backend URL with fallback
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"

// Asynchronous thunk action for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const response = await axios.get(`${backendUrl}/auth/status`, {
      withCredentials: true
    })
    return response.data
  }
)

// Asynchronous thunk action for logging out
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.get(`${backendUrl}/auth/logout`, {
    withCredentials: true
  })
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = action.payload.isAuthenticated
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || "Failed to check authentication status"
        state.isAuthenticated = false
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
      })
  }
})

export default authSlice.reducer
