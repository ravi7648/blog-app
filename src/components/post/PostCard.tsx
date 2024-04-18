import { Link } from "react-router-dom";
import Post from "../../models/post";
import User from "../../models/user";
import ProfileIcon from "../common/ProfileIcon";
import ReactionPanel from "./ReactionPanel";
import TimeAgo from "./TimeAgo";
import { APP_ROUTES } from "../../constants/appRoutes";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentButton from "./CommenButton";
import { useRef } from "react";
import "./PostCard.css";
import UserComments from "./UserComments";
import { useComments } from "../../hooks/selector";
import CommentBox from "./CommentBox";
import { useCurrentUser } from "../../hooks/session";

export default function PostCard({
  post,
  createdBy,
}: {
  post: Post;
  createdBy: User | null;
}) {
  const currentUser = useCurrentUser();

  return (
    <div className="post-container">
      <div className="d-flex gap-2 align-items-center fw-semibold">
        <ProfileIcon user={createdBy} />
        <div className="ms-2 d-flex flex-column align-items-start">
          <span> {createdBy?.name} </span>
          <TimeAgo createdAt={post.createdAt} />
        </div>
        <Link
          to={APP_ROUTES.POST(post.id)}
          className="ms-auto fs-5"
          hidden={post.userId !== currentUser?.id}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
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
