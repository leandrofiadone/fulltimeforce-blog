import React, {useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {
  fetchStory,
  updateStory,
  toggleEdit,
  setTitle,
  setBody,
  clearError
} from "../store/slices/postDetailSlice"
import {RootState} from "../store"
import styles from "./PostDetail.module.scss"
import DeleteStoryButton from "./DeletePostButton"
import {format} from "date-fns"

const PostDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const dispatch = useDispatch()
  const history = useHistory()
  const {story, loading, error, isEditing, title, body} = useSelector(
    (state: RootState) => state.postDetail
  )

  useEffect(() => {
    dispatch(fetchStory(id))
  }, [id, dispatch])

  const handleEditToggle = () => {
    dispatch(toggleEdit())
  }

  const handleSave = () => {
    dispatch(updateStory({id, title, body}))
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
                onChange={(e) => dispatch(setTitle(e.target.value))}
                className={styles.editTitle}
              />
            ) : (
              <h1 className={styles.title}>{story.title}</h1>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={body}
              onChange={(e) => dispatch(setBody(e.target.value))}
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
