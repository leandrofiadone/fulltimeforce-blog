import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

// Define el estado inicial
interface PostDetailState {
  story: any | null
  loading: boolean
  error: string | null
  isEditing: boolean
  title: string
  body: string
}

const initialState: PostDetailState = {
  story: null,
  loading: true,
  error: null,
  isEditing: false,
  title: "",
  body: ""
}

// Crear thunks para las operaciones asincrónicas
export const fetchStory = createAsyncThunk(
  "postDetail/fetchStory",
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/stories/${id}`,
        {
          withCredentials: true
        }
      )
      return response.data.story
    } catch (err) {
      return rejectWithValue("Error fetching story")
    }
  }
)

export const updateStory = createAsyncThunk(
  "postDetail/updateStory",
  async (
    {id, title, body}: {id: string; title: string; body: string},
    {rejectWithValue}
  ) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/stories/${id}`,
        {title, body},
        {withCredentials: true}
      )
      return {id, title, body}
    } catch (err) {
      return rejectWithValue("Error updating story")
    }
  }
)

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    toggleEdit(state) {
      state.isEditing = !state.isEditing
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStory.fulfilled, (state, action: PayloadAction<any>) => {
        state.story = action.payload
        state.title = action.payload.title
        state.body = action.payload.body
        state.loading = false
      })
      .addCase(fetchStory.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(updateStory.pending, (state) => {
        state.error = null
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.story = {
          ...state.story,
          title: action.payload.title,
          body: action.payload.body
        }
        state.isEditing = false
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const {toggleEdit, setTitle, setBody, clearError} =
  postDetailSlice.actions

export default postDetailSlice.reducer
