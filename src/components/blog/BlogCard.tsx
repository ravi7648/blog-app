import { Link } from "react-router-dom";
import Post from "../../models/post";
import User from "../../models/user";
import ProfileIcon from "../shared/ProfileIcon";
import ReactionPanel from "./ReactionPanel";
import TimeAgo from "./TimeAgo";
import { APP_ROUTES } from "../../constants/appRoutes";
import CommentButton from "./CommenButton";
import { MouseEventHandler, useRef } from "react";
import "./BlogCard.css";
import UserComments from "./UserComments";
import { useComments } from "../../hooks/useReduxSelectors";
import CommentBox from "./CommentBox";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Badge from "../shared/Badge";
import { useDeletePost } from "../../hooks/useReduxDispatchers";
import { ALERT_MESSAGES } from "../../constants/messages";

export default function BlogCard({
  post,
  createdBy,
}: {
  post: Post;
  createdBy: User | null;
}) {
  const currentUser = useCurrentUser();
  const deletePost = useDeletePost();
  const isAuthorrAdmin =
    currentUser?.id === post.userId || currentUser?.isAdmin;

  const handleDeleteClick: MouseEventHandler = (event) => {
    event.preventDefault();
    const confirmation = window.confirm(
      ALERT_MESSAGES.DELETE_CONFIRMATION("post", post.title)
    );
    if (confirmation) deletePost(post.id);
  };

  return (
    <div className="post-container">
      <div className="d-flex gap-2 align-items-center fw-semibold">
        <ProfileIcon user={createdBy} />
        <div className="ms-2 d-flex flex-column align-items-start">
          <span>
            {createdBy?.name}
            <Badge label="Draft" hidden={!post.isPublished} />
          </span>
          <TimeAgo createdAt={post.createdAt} />
        </div>
        {isAuthorrAdmin && (
          <div className="ms-auto">
            <Link
              to={APP_ROUTES.BLOG(post.id)}
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
        )}
      </div>
      <div className="text-start mb-3">
        <h2 className="text-capitalize">{post.title}</h2>
        <p className="post-body">{post.body}</p>
      </div>

      {currentUser && <LoggedInUserFeatures post={post} />}
    </div>
  );
}

const LoggedInUserFeatures = ({ post }: { post: Post }) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const comments = useComments();
  const postComments = comments.data?.filter(
    (comment) => comment.postId === post.id
  );

  return (
    <>
      <div className="hr-line"></div>
      <div className="d-flex align-items-end justify-content-between">
        <ReactionPanel post={post} />
        <CommentButton commentContainer={commentRef} post={post} />
      </div>
      <div className="hide mx-2" ref={commentRef}>
        {postComments?.map((comment) => (
          <UserComments key={comment.id} comment={comment} />
        ))}

        <CommentBox post={post} />
      </div>
    </>
  );
};
