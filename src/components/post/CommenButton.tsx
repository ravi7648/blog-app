import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RefObject } from "react";
import { useAppDispatch } from "../../hooks/dispatcher";
import Post from "../../models/post";
import { addPostCommentsAsync } from "../../redux/thunks/commentThunk";

export default function CommentButton({
  commentContainer,
  post,
}: {
  commentContainer: RefObject<HTMLDivElement>;
  post: Post;
}) {
  const dispatch = useAppDispatch();

  function loadComments() {
    dispatch(addPostCommentsAsync(post.id));
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
