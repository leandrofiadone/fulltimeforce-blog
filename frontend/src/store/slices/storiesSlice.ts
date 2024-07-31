import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

// types/Story.ts
export interface User {
  _id: string
  displayName: string
}

export interface Story {
  updatedAt: string | number | Date
  _id: string
  status: string
  title: string
  body: string
  user: User | null
  createdAt?: string // Asegúrate de que esto esté presente
}

interface StoriesState {
  stories: Story[]
  story: Story | null // Añadir esta línea
  loading: boolean
  error: string | null
}

const initialState: StoriesState = {
  stories: [],
  story: null, // Añadir esta línea
  loading: false,
  error: null
}



// Asynchronous thunk action for fetching a specific story
export const fetchStoryById = createAsyncThunk(
  "stories/fetchStoryById",
  async (id: string) => {
    const response = await axios.get(`http://localhost:8080/stories/${id}`, {
      withCredentials: true
    
    })
      console.log("response solitario", response)
    return response.data.story
  }
)

// Asynchronous thunk action for fetching stories
export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async () => {
    const response = await axios.get("http://localhost:8080/api/stories", {
      withCredentials: true
    })

    return response.data
  }
)

// Asynchronous thunk action for deleting a story
export const deleteStory = createAsyncThunk(
  "stories/deleteStory",
  async (id: string, {rejectWithValue}) => {
    try {
      await axios.delete(`http://localhost:8080/stories/${id}`, {
        withCredentials: true
      })
      return id
    } catch (error: unknown) {
      // Use type assertion to handle the error
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to delete story"
        )
      }
      return rejectWithValue("Failed to delete story")
    }
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
      .addCase(fetchStoryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.loading = false
        state.story = action.payload
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch story"
      })
      .addCase(deleteStory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.loading = false
        state.stories = state.stories.filter(
          (story) => story._id !== action.payload
        )
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Failed to delete story"
      })
  }
})

export default storiesSlice.reducer

