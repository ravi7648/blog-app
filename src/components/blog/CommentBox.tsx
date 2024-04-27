import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEventHandler, MouseEventHandler, useRef } from "react";
import Post from "../../models/post";
import Comment from "../../models/comment";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAddComment } from "../../hooks/useReduxDispatchers";

export default function CommentBox({ post }: { post: Post }) {
  const commentRef = useRef<HTMLInputElement>(null);
  const addComment = useAddComment();
  const currentUser = useCurrentUser();

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    submitComment();
  };

  const handleKeyboardEvent: KeyboardEventHandler = (event) => {
    if (event.key === "Enter") {
      submitComment();
    }
  };

  const submitComment = () => {
    if (commentRef.current?.value) {
      const comment = Comment.create(
        commentRef.current.value,
        post.id,
        currentUser!
      );

      addComment(comment);
      commentRef.current.value = "";
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <input
        type="text"
        ref={commentRef}
        className="form-control"
        placeholder="Write a comment"
        onKeyDown={handleKeyboardEvent}
      />
      <button className="btn btn-primary" onClick={handleClick}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}
