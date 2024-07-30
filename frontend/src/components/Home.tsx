import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory, Link} from "react-router-dom"
import styles from "./Home.module.scss"
import {RootState} from "../store"
import {fetchStories} from "../store/slices/storiesSlice"
import Logout from "../components/Logout"
import {format} from "date-fns"

const PAGE_SIZE = 10 // Número de posts por página

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {stories, loading, error} = useSelector(
    (state: RootState) => state.stories
  )
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  const handleCreatePost = () => {
    history.push("/create-post")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Calcula el índice de los posts a mostrar en la página actual
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentPosts = stories.slice(startIndex, endIndex)

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

      <button className={styles.createPostButton} onClick={handleCreatePost}>
        Create New Post
      </button>
      <Logout />

      <div className={styles["card-container"]}>
        {currentPosts.length > 0 ? (
          currentPosts.map((story) => (
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

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        {currentPosts.length === PAGE_SIZE && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
