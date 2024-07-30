import axios from "axios"
import React from "react"
import styles from "./DeletePostButton.module.scss"

interface DeletePostButtonProps {
  id: string
  onDeleteSuccess: () => void
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  id,
  onDeleteSuccess
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/stories/${id}`, {
        withCredentials: true
      })

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
