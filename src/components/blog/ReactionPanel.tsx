import { REACTIONS } from "../../constants/reactions";
import { useAddReaction } from "../../hooks/useReduxDispatchers";
import Post from "../../models/post";
import "./ReactionPanel.css";

export default function ReactionPanel({ post }: { post: Post }) {
  const { id, reactions } = post;
  const addReaction = useAddReaction();

  return (
    <div className="reaction-panel">
      <button
        className="btn"
        onClick={() => addReaction({ postId: id, type: REACTIONS.LIKE })}
      >
        👍 {reactions.like}
      </button>
      <button
        className="btn"
        onClick={() => addReaction({ postId: id, type: REACTIONS.LOVE })}
      >
        ❤️ {reactions.love}
      </button>
      <button
        className="btn"
        onClick={() => addReaction({ postId: id, type: REACTIONS.CELEBRATE })}
      >
        🎉 {reactions.celebrate}
      </button>
      <button
        className="btn"
        onClick={() => addReaction({ postId: id, type: REACTIONS.INSIGHTFUL })}
      >
        🤔 {reactions.insightful}
      </button>
      <button
        className="btn"
        onClick={() => addReaction({ postId: id, type: REACTIONS.FUNNY })}
      >
        😄 {reactions.funny}
      </button>
    </div>
  );
}
