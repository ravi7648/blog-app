import { REACTIONS } from "../../constants/reactions";
import { useAppDispatch } from "../../hooks/dispatcher";
import Post from "../../models/post";
import { addReactionAsync } from "../../redux/thunks/postThunk";
import "./ReactionPanel.css";

export default function ReactionPanel({ post }: { post: Post }) {
  const { id, reactions } = post;
  const dispatch = useAppDispatch();
  
  function addReaction(reactionType: string) {
    dispatch(addReactionAsync({ postId: id, type: reactionType }));
  }

  return (
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
