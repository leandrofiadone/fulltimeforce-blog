import React, {useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import {backendUrl} from "../config"
import styles from "./CreatePost.module.scss"

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const history = useHistory()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await axios.post(
        `${backendUrl}/stories`,
        {title, body},
        {withCredentials: true}
      )
      setSuccess("Post created successfully!")
      setTitle("")
      setBody("")
      setError(null)
    } catch (err) {
      console.error("Error creating post:", err)
      setError("Failed to create post.")
      setSuccess(null)
    }
  }

  const handleGoBack = () => {
    history.push("/home")
  }

  return (
    <div className={styles.createPost}>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {success && <p className={styles["success-message"]}>{success}</p>}
      {error && <p className={styles["error-message"]}>{error}</p>}
      <button className={styles.goBackButton} onClick={handleGoBack}>
        Go Back to Home
      </button>
    </div>
  )
}

export default CreatePost
