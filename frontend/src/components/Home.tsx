import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {useHistory, Link} from "react-router-dom"
import {format} from "date-fns"
import styles from "./Home.module.scss"
import {RootState} from "../store"
import {fetchStories} from "../store/slices/storiesSlice"
import Logout from "../components/Logout"

const PAGE_SIZE = 8 // Número de posts por página

interface HomeProps {
  isAuthenticated: boolean
}

const Home: React.FC<HomeProps> = ({isAuthenticated}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {stories, loading, error, name} = useSelector(
    (state: RootState) => state.stories
  )

  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    dispatch(fetchStories())
  }, [dispatch])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleLogin = () => {
    history.push("/login")
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
      <div className={styles["greeting-container"]}>
        <h1 className={styles.greeting}>Hello, {name}!</h1>{" "}
        {/* Muestra el nombre del usuario */}
        {!isAuthenticated && (
          <button className={styles.loginbutton} onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
      {isAuthenticated && (
        <button
          className={styles.createPostButton}
          onClick={() => history.push("/create-post")}>
          Create New Post
        </button>
      )}
      {isAuthenticated && <Logout />}
      <div className={styles["card-container"]}>
        {currentPosts.length > 0 ? (
          currentPosts.map((story) => {
            // const createdAt = story.createdAt ? new Date(story.createdAt) : null
            // const updatedAt = story.updatedAt ? new Date(story.updatedAt) : null
            // const isUpdated = updatedAt && createdAt && updatedAt > createdAt

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

                {/* Elimina esta parte para quitar el indicador de actualización */}
                {/* {isUpdated && (
                  <div className={styles["card-updated-indicator"]}>
                    Updated
                  </div>
                )} */}
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
