import {configureStore} from "@reduxjs/toolkit"
import storiesReducer from "./slices/storiesSlice"
import authReducer from "./slices/authSlice"
import postDetailReducer from "./slices/postDetailSlice"

const store = configureStore({
  reducer: {
    stories: storiesReducer,
    auth: authReducer,
    postDetail: postDetailReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
