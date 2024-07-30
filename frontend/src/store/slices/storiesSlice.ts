import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

// types/Story.ts
export interface Story {
  _id: string;
  status: string;
  title: string;
  body: string;
  user: string;
  createdAt?: string; // Asegúrate de que esto esté presente
}


interface StoriesState {
  stories: Story[]
  loading: boolean
  error: string | null
}

const initialState: StoriesState = {
  stories: [],
  loading: false,
  error: null
}

// Asynchronous thunk action for fetching stories
export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async () => {
    const response = await axios.get("http://localhost:8080/api/stories", {
      withCredentials: true
    })
    console.log(response)
    return response.data
  }
)

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false
        state.stories = action.payload.stories
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch stories"
      })
  }
})

export default storiesSlice.reducer
