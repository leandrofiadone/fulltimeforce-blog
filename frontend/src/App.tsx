import React, {useEffect} from "react"
import {Route, Redirect, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import Login from "./components/Login"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import PostDetail from "./components/PostDetail"
import {checkAuthStatus} from "./store/slices/authSlice"
import {RootState} from "./store"
import "./App.css"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const {isAuthenticated, loading} = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (loading) {
    return <div className="loader"></div>
  }

  return (
    <Switch>
      <Route path="/home">
        <Home isAuthenticated={!!isAuthenticated} />
      </Route>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/home" /> : <Login />}
      </Route>
      <Route path="/create-post">
        {isAuthenticated ? <CreatePost /> : <Redirect to="/login" />}
      </Route>
      <Route path="/story/:id">
        <PostDetail isAuthenticated={!!isAuthenticated} />
      </Route>
      <Redirect from="/" to="/home" />
    </Switch>
  )
}

export default App
