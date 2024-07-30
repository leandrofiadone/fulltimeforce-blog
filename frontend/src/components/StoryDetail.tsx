import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import styles from "./StoryDetail.module.scss"

const StoryDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/stories/${id}`, {withCredentials: true})
        setStory(response.data.story)
      } catch (err) {
        setError("Error fetching story")
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.storyDetail}>
      {story ? (
        <>
          <h1>{story.title}</h1>
          <p>{story.body}</p>
          {/* <p>Author: {story.user.name}</p> */}
        </>
      ) : (
        <div>No story found</div>
      )}
    </div>
  )
}

export default StoryDetail
