import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "../../types/session";
import ProfileIcon from "../common/ProfileIcon";
import { MouseEventHandler, useRef } from "react";
import { ALERT_MESSAGES } from "../../constants/messages";
import { useAppDispatch } from "../../hooks/dispatcher";
import Post from "../../models/post";
import "./PostForm.css";
import { addPostAsync } from "../../redux/thunks/postThunk";

export default function PostForm({ session }: { session: Session }) {
  const dispatch = useAppDispatch();
  const [titleRef, bodyRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
  ];

  const handleSubmit: MouseEventHandler = (event) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    if (!title || !body) {
      alert(ALERT_MESSAGES.EMPTY_FIELDS);
      return;
    }

    const newPost = Post.create(session.user?.id, title, body);
    dispatch(addPostAsync(newPost));
    clearForm();
  };

  function clearForm() {
    titleRef.current!.value = "";
    bodyRef.current!.value = "";
  }

  return (
    <form className="post-form-container">
      <div className="d-flex gap-2 align-items-center fw-semibold">
        <ProfileIcon user={session.user} />
        <div className="ms-2 d-flex flex-column align-items-start">
          <span> {session.user?.name} </span>
        </div>
      </div>
      <div className="text-start mb-3">
        <div className="form-group mb-3">
          <input
            type="text"
            ref={titleRef}
            id="title"
            className="form-control"
            placeholder="Blog title"
          />
        </div>
        <div className="form-group">
          <textarea
            id="body"
            ref={bodyRef}
            className="form-control"
            placeholder="Blog body"
          ></textarea>
        </div>
      </div>
      <div className="hr-line"></div>
      <button
        type="submit"
        className="btn btn-primary align-self-end"
        onClick={handleSubmit}
      >
        <span className="me-3">Post</span>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}
