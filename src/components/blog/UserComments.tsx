import { Link } from "react-router-dom";
import Comment from "../../models/comment";
import { getInitials } from "../../utils/userUtils";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { TOAST_MESSAGES } from "../../constants/messages";
import "./UserComments.css";
import {
  useDeleteComment,
  useUpdateComment,
} from "../../hooks/useReduxDispatchers";

export default function UserComments({ comment }: { comment: Comment }) {
  const currentUser = useCurrentUser();
  const isAuthorOrAdmin =
    currentUser?.email === comment.email || currentUser?.isAdmin;
  return (
    <div className="d-flex mb-4">
      <div className="round-circle fw-semibold">
        {getInitials(comment.name).slice(0, 2)}
      </div>
      <div className="comment-info py-2">
        <div className="mx-2">
          <div className="fw-semibold text-start text-capitalize">
            {comment.name}
          </div>
          <div className="fw-lighter text-start position-relative">
            <span>{comment.body}</span>
            {isAuthorOrAdmin && <EditOrDelete comment={comment} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const EditOrDelete = ({ comment }: { comment: Comment }) => {
  const deleteComment = useDeleteComment();
  const updateComment = useUpdateComment();

  function handleDeleteClick(event: any) {
    event.preventDefault();
    const confirmation = window.confirm(
      TOAST_MESSAGES.DELETE_CONFIRMATION("comment", comment.body)
    );
    if (confirmation) deleteComment(comment.id);
  }

  function handleEditClick(event: any) {
    event.preventDefault();
    const newComment = prompt("Edit your comment", comment.body);
    if (newComment) {
      const updatedComment = { ...comment, body: newComment };
      updateComment(updatedComment);
    }
  }

  return (
    <div className="text-start position-absolute edit-delete-option">
      <Link
        to=""
        onClick={handleEditClick}
        className="ms-auto fw-light text-decoration-none"
      >
        Edit
      </Link>
      <span> {" | "}</span>
      <Link
        to=""
        onClick={handleDeleteClick}
        className="ms-auto fw-light text-decoration-none"
      >
        Delete
      </Link>
    </div>
  );
};
