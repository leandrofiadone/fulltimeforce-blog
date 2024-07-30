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

// Asynchronous thunk action for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const response = await axios.get("http://localhost:8080/auth/status", {
      withCredentials: true
    })
    return response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
    }
  },
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
  }
})

export const {logout} = authSlice.actions

export default authSlice.reducer
