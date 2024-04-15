import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentButton() {
  return (
    <button className="btn">
      <FontAwesomeIcon icon={faComment} />
      <span className="ms-2 fw-light"> Comments </span>
    </button>
  );
}
