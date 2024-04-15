import { Link } from "react-router-dom";
import { REACTIONS } from "../../constants/reactions";
import { useAppDispatch } from "../../hooks/dispatcher";
import Post from "../../models/post";
import { addReactionAsync } from "../../redux/slices/postSlice";
import { Session } from "../../types/session";
import "./ReactionPanel.css";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function ReactionPanel({
  post,
  session,
}: {
  post: Post;
  session: Session;
}) {
  const { id, reactions } = post;
  const dispatch = useAppDispatch();
  function addReaction(reactionType: string) {
    dispatch(addReactionAsync({ postId: id, type: reactionType }));
  }

  return !session.loggedIn ? (
    <Link className="fw-bold btn" to={APP_ROUTES.LOGIN}>
      Please login to add reactions
    </Link>
  ) : (
    <div className="reaction-panel">
      <button className="btn" onClick={() => addReaction(REACTIONS.LIKE)}>
        👍 {reactions.like}
      </button>
      <button className="btn" onClick={() => addReaction(REACTIONS.LOVE)}>
        ❤️ {reactions.love}
      </button>
      <button className="btn" onClick={() => addReaction(REACTIONS.CELEBRATE)}>
        🎉 {reactions.celebrate}
      </button>
      <button className="btn" onClick={() => addReaction(REACTIONS.INSIGHTFUL)}>
        🤔 {reactions.insightful}
      </button>
      <button className="btn" onClick={() => addReaction(REACTIONS.FUNNY)}>
        😄 {reactions.funny}
      </button>
    </div>
  );
}
