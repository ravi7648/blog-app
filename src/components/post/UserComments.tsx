import Comment from "../../models/comment";
import { getInitials } from "../../utils/userUtils";
import "./UserComments.css";

export default function UserComments({ comment }: { comment: Comment }) {
  return (
    <div className="d-flex mb-3">
      <div className="round-circle fw-semibold">
        {getInitials(comment.name).slice(0, 2)}
      </div>
      <div className="comment-info py-2">
        <div className="mx-2">
          <div className="fw-semibold text-start text-capitalize">{comment.name}</div>
          <div className="fw-lighter text-start">{comment.body}</div>
        </div>
      </div>
    </div>
  );
}
