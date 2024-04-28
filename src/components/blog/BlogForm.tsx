import { faFloppyDisk, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileIcon from "../shared/ProfileIcon";
import { MouseEventHandler, useRef } from "react";
import { ALERT_MESSAGES } from "../../constants/messages";
import { useAddPost, useUpdatePost } from "../../hooks/useReduxDispatchers";
import Post from "../../models/post";
import "./BlogForm.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Badge from "../shared/Badge";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function BlogForm({ post }: { post?: Post }) {
  const addPost = useAddPost();
  const updatePost = useUpdatePost();
  const navigate = useNavigate();
  const [titleRef, bodyRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
  ];
  const currentUser = useCurrentUser();
  const editable = !post || currentUser?.id === post?.userId;

  function clearForm() {
    titleRef.current!.value = "";
    bodyRef.current!.value = "";
  }

  const handleSubmit: MouseEventHandler = (event) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    if (!title || !body) {
      alert(ALERT_MESSAGES.EMPTY_FIELDS);
      return;
    }

    if (post) {
      const updatedPost = Post.update(post, title, body);
      updatePost(updatedPost);
    } else {
      const newPost = Post.create(currentUser?.id, title, body);
      addPost(newPost);
    }
    clearForm();
    navigate(APP_ROUTES.BLOGS);
  };

  const handleDraftSubmit: MouseEventHandler = (event) => {
    event.preventDefault();
    const isPublished = false;

    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;

    if (!title || !body) {
      alert(ALERT_MESSAGES.EMPTY_FIELDS);
      return;
    }

    if (post) {
      const updatedPost = Post.update(post, title, body, isPublished);
      updatePost(updatedPost);
    } else {
      const newPost = Post.create(currentUser?.id, title, body, isPublished);
      addPost(newPost);
    }

    clearForm();
    navigate(APP_ROUTES.BLOGS);
  };

  return (
    <form className="post-form-container">
      <div className="d-flex gap-2 align-items-center fw-semibold">
        <ProfileIcon user={currentUser} />
        <div className="ms-2 d-flex flex-column align-items-start">
          <span>
            {currentUser?.name}
            {post && <Badge label="Draft" hidden={!post?.isPublished} />}
            {currentUser && (
              <Badge
                label="Blocked"
                hidden={currentUser.blocked || false}
                className="badge-alert"
              />
            )}
          </span>
        </div>
      </div>
      <div className="text-start mb-3">
        <div className="form-group mb-3">
          <input
            type="text"
            ref={titleRef}
            defaultValue={post?.title || ""}
            id="title"
            className="form-control"
            placeholder="Blog title"
            disabled={!editable || currentUser?.blocked}
          />
        </div>
        <div className="form-group">
          <textarea
            id="body"
            ref={bodyRef}
            defaultValue={post?.body || ""}
            className="form-control"
            placeholder="Blog body"
            disabled={!editable || currentUser?.blocked}
          ></textarea>
        </div>
      </div>
      <div className="hr-line"></div>
      {editable && (
        <div className="align-self-end">
          <button
            type="submit"
            className="btn btn-secondary me-2"
            onClick={handleDraftSubmit}
            disabled={!editable || currentUser?.blocked}
          >
            <span className="me-3">Save as draft</span>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!editable || currentUser?.blocked}
          >
            <span className="me-3">Post</span>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}
    </form>
  );
}
