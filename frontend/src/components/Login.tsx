import React, {Component} from "react"
import {FaGoogle, FaGithub} from "react-icons/fa"
import styles from "./Login.module.scss"

class Login extends Component {
  handleGoogleLogin = () => {
    // Redirect to backend Google OAuth route
    window.location.href = "http://localhost:8080/auth/google"
  }

  handleGithubLogin = () => {
    // Redirect to backend GitHub OAuth route
    window.location.href = "http://localhost:8080/auth/github"
  }

  render() {
    return (
      <div className={styles.login}>
        <h1>Blog App</h1>
        <button onClick={this.handleGoogleLogin} className={styles.loginButton}>
          <FaGoogle className={styles.icon} /> Login with Google
        </button>
        <button
          onClick={this.handleGithubLogin}
          className={`${styles.loginButton} ${styles.github}`}>
          <FaGithub className={styles.icon} /> Login with GitHub
        </button>
      </div>
    )
  }
}

export default Login
