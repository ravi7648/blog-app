import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEventHandler, MouseEventHandler, useRef } from "react";
import { useAppDispatch } from "../../hooks/dispatcher";
import { currentSession } from "../../redux/slices/sessionSlice";
import { useAppSelector } from "../../hooks/selector";
import Post from "../../models/post";
import Comment from "../../models/comment";
import { addCommentAsync } from "../../redux/thunks/commentThunk";

export default function CommentBox({ post }: { post: Post }) {
  const commentRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const session = useAppSelector(currentSession);

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
        session
      );

      dispatch(addCommentAsync(comment));
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
      <button
        className="btn btn-primary"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}
