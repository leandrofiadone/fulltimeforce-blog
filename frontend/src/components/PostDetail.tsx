import React, {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import axios from "axios"
import styles from "./PostDetail.module.scss"
import DeleteStoryButton from "./DeletePostButton"
import {format} from "date-fns"

const PostDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const history = useHistory()

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/stories/${id}`,
          {
            withCredentials: true
          }
        )
        setStory(response.data.story)
        setTitle(response.data.story.title)
        setBody(response.data.story.body)
      } catch (err) {
        setError("Error fetching story")
      } finally {
        setLoading(false)
      }
    }
    fetchStory()
  }, [id])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }



  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/stories/stories/${id}`,
        {title, body},
        {withCredentials: true}
      )
      setStory({...story, title, body})
      setIsEditing(false)
    } catch (err) {
      setError("Error updating story")
    }
  }



  const handleDeleteSuccess = () => {
    alert("Story deleted successfully")
    history.push("/") // Redirige al usuario a la página principal después de eliminar
  }

  const handleGoBack = () => {
    history.push("/home")
  }

  if (loading) return <div className={styles.loading}></div>
  if (error) return <div className={styles.error}>Error: {error}</div>

  return (
    <div className={styles.storyDetail}>
      {story ? (
        <>
          <div className={styles.header}>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.editTitle}
              />
            ) : (
              <h1 className={styles.title}>{story.title}</h1>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={styles.editBody}
            />
          ) : (
            <p className={styles.content}>{story.body}</p>
          )}
          <div className={styles.footer}>
            <p className={styles.date}>
              Created on: {format(new Date(story.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
          {isEditing ? (
            <div className={styles.editActions}>
              <button onClick={handleSave} className={styles.saveButton}>
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          ) : (
            <button className={styles.editButton} onClick={handleEditToggle}>
              Edit
            </button>
          )}
          <div className={styles.footerWithDelete}>
            <button className={styles.goBackButton} onClick={handleGoBack}>
              Go Back to Home
            </button>
            <div className={styles.deleteButtonContainer}>
              <DeleteStoryButton
                id={id!}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </div>
          </div>
        </>
      ) : (
        <div>No story found</div>
      )}
    </div>
  )
}

export default PostDetail
