import {configureStore} from "@reduxjs/toolkit"
import storiesReducer from "./slices/storiesSlice"
import authReducer from "./slices/authSlice"

const store = configureStore({
  reducer: {
    stories: storiesReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
