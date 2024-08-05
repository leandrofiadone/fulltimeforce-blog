import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {backendUrl} from "../../config"

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

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const response = await axios.get(`${backendUrl}/auth/status`, {
      withCredentials: true
    })
    return response.data
  }
)

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
