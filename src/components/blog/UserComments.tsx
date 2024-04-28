import { Link } from "react-router-dom";
import Comment from "../../models/comment";
import { getInitials } from "../../utils/userUtils";
import "./UserComments.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDeleteComment } from "../../hooks/useReduxDispatchers";
import { ALERT_MESSAGES } from "../../constants/messages";

export default function UserComments({ comment }: { comment: Comment }) {
  const currentUser = useCurrentUser();
  const isAuthorOrAdmin =
    currentUser?.name === comment.name || currentUser?.isAdmin;
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

  function handleDeleteClick(event: any) {
    event.preventDefault();
    const confirmation = window.confirm(
      ALERT_MESSAGES.DELETE_CONFIRMATION("comment", comment.body)
    );
    if (confirmation) deleteComment(comment.id);
  }

  return (
    <div className="text-start position-absolute edit-delete-option">
      <Link to={""} className="ms-auto fw-light text-decoration-none">
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
