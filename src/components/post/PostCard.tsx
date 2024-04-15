import { Link } from "react-router-dom";
import Post from "../../models/post";
import User from "../../models/user";
import { Session } from "../../types/session";
import ProfileIcon from "../common/ProfileIcon";
import "./PostCard.css";
import ReactionPanel from "./ReactionPanel";
import TimeAgo from "./TimeAgo";
import { APP_ROUTES } from "../../constants/appRoutes";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentButton from "./CommenButton";

export default function PostCard({
  post,
  createdBy,
  session,
}: {
  post: Post;
  createdBy: User | null;
  session: Session;
}) {
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
          hidden={post.userId !== session.id}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </div>
      <div className="text-start mb-3">
        <h2 className="text-capitalize">{post.title}</h2>
        <p className="post-body">{post.body}</p>
      </div>
      <div className="hr-line"></div>
      <div className="d-flex align-items-end justify-content-between">
        <ReactionPanel post={post} session={session} />
        <CommentButton />
      </div>
    </div>
  );
}
