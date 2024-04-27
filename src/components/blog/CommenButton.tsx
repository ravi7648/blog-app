import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RefObject } from "react";
import Post from "../../models/post";
import { usePostComments } from "../../hooks/useReduxDispatchers";

export default function CommentButton({
  commentContainer,
  post,
}: {
  commentContainer: RefObject<HTMLDivElement>;
  post: Post;
}) {
  const loadPostComments = usePostComments();

  function loadComments() {
    loadPostComments(post.id);
  }

  function showComments() {
    loadComments();
    if (commentContainer.current) {
      commentContainer.current.classList.toggle("hide");
      commentContainer.current.classList.toggle("show");
    }
  }

  return (
    <button className="btn" onClick={showComments}>
      <FontAwesomeIcon icon={faComment} />
      <span className="ms-2 fw-light"> Comments </span>
    </button>
  );
}
