import React, {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import axios from "axios"
import styles from "./StoryDetail.module.scss"
import DeleteStoryButton from "./DeleteStoryButton"
import {format} from "date-fns"

const StoryDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
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
      } catch (err) {
        setError("Error fetching story")
      } finally {
        setLoading(false)
      }
    }
    fetchStory()
  }, [id])

  const handleDeleteSuccess = () => {
    alert("Story deleted successfully")
    history.push("/") // Redirige al usuario a la página principal después de eliminar
  }

    const handleGoBack = () => {
      history.push("/home")
    }

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>Error: {error}</div>

  return (
    <div className={styles.storyDetail}>
      {story ? (
        <>
          <div className={styles.header}>
            <h1 className={styles.title}>{story.title}</h1>
          </div>
          <p className={styles.content}>{story.body}</p>
          {/* <p className={styles.author}>Author: {story.user.name}</p> */}
          <div className={styles.footer}>
            <p className={styles.date}>
              Created on: {format(new Date(story.createdAt), "MMMM dd, yyyy")}
            </p>
            <DeleteStoryButton id={id!} onDeleteSuccess={handleDeleteSuccess} />
          </div>
        </>
      ) : (
        <div>No story found</div>
      )}
      <button className={styles.goBackButton} onClick={handleGoBack}>
        Go Back to Home
      </button>
    </div>
  )
}

export default StoryDetail
