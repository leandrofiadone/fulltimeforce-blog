import React, {useEffect} from "react"
import {Route, Redirect, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import Login from "./components/Login"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import {checkAuthStatus} from "./store/slices/authSlice"
import {RootState} from "./store"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const {isAuthenticated, loading} = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (loading) {
    // Show a loader while checking auth status
    return <div>Loading...</div>
  }

  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/home" /> : <Login />}
      </Route>
      <Route path="/home">
        {isAuthenticated ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/create-post">
        {isAuthenticated ? <CreatePost /> : <Redirect to="/login" />}
      </Route>
      <Redirect from="/" to={isAuthenticated ? "/home" : "/login"} />
    </Switch>
  )
}

export default App
