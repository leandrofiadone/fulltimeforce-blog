import React from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {logoutUser} from "../store/slices/authSlice"
import styles from "./Logout.module.scss"

const Logout: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    history.push("/login") // Redirigir a la página de inicio de sesión después de cerrar sesión
  }

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
