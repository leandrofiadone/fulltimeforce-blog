import React from "react"
import {useDispatch} from "react-redux"
import Swal from "sweetalert2"
// Adjust the path as necessary
import styles from "./DeletePostButton.module.scss"
import {deleteStory} from "../store/slices/storiesSlice"

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    })

    if (result.isConfirmed) {
      try {
        await dispatch(deleteStory(id))
        onDeleteSuccess()
        Swal.fire("Deleted!", "The post has been deleted.", "success")
      } catch (err) {
        Swal.fire("Error!", "Failed to delete the post.", "error")
        console.error(err)
      }
    }
  }

  return (
    <button className={styles.button} onClick={handleDelete}>
      Delete Post
    </button>
  )
}

export default DeletePostButton
