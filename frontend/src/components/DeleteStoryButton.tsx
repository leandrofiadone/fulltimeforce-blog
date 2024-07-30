import axios from "axios"
import React from "react"
import styles from "./DeleteStoryButton.module.scss"

interface DeleteStoryButtonProps {
  id: string
  onDeleteSuccess: () => void
}

const DeleteStoryButton: React.FC<DeleteStoryButtonProps> = ({
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
      Delete Story
    </button>
  )
}

export default DeleteStoryButton
