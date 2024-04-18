import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../../models/post";
import TimeAgo from "./TimeAgo";
import ProfileIcon from "../common/ProfileIcon";
import { useUsers } from "../../hooks/selector";

export default function PostHomeCard(props: { post: Post }) {
  const users = useUsers();

  const getUser = (userId: number) => {
    return users.data?.find((user) => user.id === userId) || null;
  };

  return (
    <div className="card mb-4 box-shadow">
      <div className="card-body">
        <div className="d-flex gap-2">
          <ProfileIcon user={getUser(props.post.userId)} />
          <p className="card-text text-start fit-content-width">
            {props.post.body.slice(0, 100) + "..."}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group d-flex align-items-center">
            <div className="p-2">
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <span> {props.post.reactions.total} </span>
          </div>
          <TimeAgo createdAt={props.post.createdAt} />
        </div>
      </div>
    </div>
  );
}
