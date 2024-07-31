import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory, Link} from "react-router-dom"
import {format} from "date-fns"
import styles from "./Home.module.scss"
import {RootState} from "../store"
import {fetchStories} from "../store/slices/storiesSlice"
import Logout from "../components/Logout"

const PAGE_SIZE = 12 // Número de posts por página

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {stories, loading, error} = useSelector(
    (state: RootState) => state.stories
  )

  console.log('stories',stories)
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

  // Ordena las historias por fecha de creación (más reciente primero)
  const sortedStories = [...stories].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
    return dateB.getTime() - dateA.getTime()
  })

  // Calcula el índice de los posts a mostrar en la página actual
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentPosts = sortedStories.slice(startIndex, endIndex)

  

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles["loading-spinner"]}></div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className={styles.home}>
      <h1>Hello!</h1>

      <button className={styles.createPostButton} onClick={handleCreatePost}>
        Create New Post
      </button>
      <Logout />

      <div className={styles["card-container"]}>
        {currentPosts.length > 0 ? (
          currentPosts.map((story) => {
            const createdAt = story.createdAt ? new Date(story.createdAt) : null
            const updatedAt = story.updatedAt ? new Date(story.updatedAt) : null
            const isUpdated = updatedAt && createdAt && updatedAt > createdAt

            return (
              <Link
                key={story._id}
                to={`/story/${story._id}`}
                className={styles.card}>
                <div className={styles["card-title"]}>{story.title}</div>
                <div className={styles["card-body"]}>{story.body}</div>
                <div
                  className={`${styles["card-author"]} ${
                    story.user ? "" : styles.retired
                  }`}>
                  {story.user?.displayName || "Retired Member"}
                </div>

                <div className={styles["card-date"]}>
                  {story.createdAt
                    ? format(new Date(story.createdAt), "MMMM dd, yyyy")
                    : "Date not available"}
                </div>

                {isUpdated && (
                  <div className={styles["card-updated-indicator"]}>
                    Updated
                  </div>
                )}
              </Link>
            )
          })
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
