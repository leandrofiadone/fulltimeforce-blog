import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory, Link} from "react-router-dom"
import styles from "./Home.module.scss"
import {RootState} from "../store"
import {fetchStories} from "../store/slices/storiesSlice"
import Logout from "../components/Logout"
import {format} from "date-fns"

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {stories, loading, error} = useSelector(
    (state: RootState) => state.stories
  )

  React.useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  const handleCreatePost = () => {
    history.push("/create-post")
  }

  if (loading)
    return (
      <div className={styles.loading}>
        <div className={styles["loading-spinner"]}></div>
      </div>
    )
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.home}>
      <h1>Hello!</h1>

      <div className={styles["card-container"]}>
        {stories.length > 0 ? (
          stories.map((story) => (
            <Link
              key={story._id}
              to={`/story/${story._id}`}
              className={styles.card}>
              <div className={styles["card-title"]}>{story.title}</div>
              <div className={styles["card-body"]}>{story.body}</div>
              <div className={styles["card-date"]}>
                {story.createdAt
                  ? format(new Date(story.createdAt), "MMMM dd, yyyy")
                  : "Date not available"}
              </div>
            </Link>
          ))
        ) : (
          <div className={styles["no-stories"]}>No stories available</div>
        )}
      </div>
      <button className={styles.createPostButton} onClick={handleCreatePost}>
        Create New Post
      </button>
      <Logout />
    </div>
  )
}

export default Home
