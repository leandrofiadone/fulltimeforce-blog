import React from "react"
import {useDispatch} from "react-redux"
 // Ajusta la ruta según sea necesario
import styles from "./DeletePostButton.module.scss"
import { deleteStory } from '../store/slices/storiesSlice'

interface DeletePostButtonProps {
  id: string
  onDeleteSuccess: () => void
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  id,
  onDeleteSuccess
}) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      await dispatch(deleteStory(id))
      onDeleteSuccess()
    } catch (err) {
      alert("Failed to delete story")
      console.error(err)
    }
  }

  return (
    <button className={styles.button} onClick={handleDelete}>
      Delete Post
    </button>
  )
}

export default DeletePostButton
