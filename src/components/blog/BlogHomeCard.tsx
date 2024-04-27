import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../../models/post";
import TimeAgo from "./TimeAgo";
import ProfileIcon from "../shared/ProfileIcon";
import { useUsers } from "../../hooks/useReduxSelectors";
import Badge from "../shared/Badge";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function BlogHomeCard(props: { post: Post }) {
  const users = useUsers();

  const getUser = (userId: number) => {
    return users.data?.find((user) => user.id === userId) || null;
  };

  return (
    <Link to={APP_ROUTES.BLOG(props.post.id)} className="text-decoration-none">
      <div className="card mb-4 box-shadow" style={{ minHeight: "150px" }}>
        <div className="card-body d-flex flex-column justify-content-between ">
          <div className="d-flex gap-2">
            <ProfileIcon user={getUser(props.post.userId)} />
            <p className="card-text text-start fit-content-width">
              {props.post.body.slice(0, 100) + "..."}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group d-flex align-items-center">
              {props.post.isPublished && (
                <>
                  <div className="p-2">
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                  <span> {props.post.reactions.total} </span>
                </>
              )}
              <Badge
                label="Draft"
                className="mt-2"
                hidden={!props.post.isPublished}
              />
            </div>
            <TimeAgo createdAt={props.post.createdAt} />
          </div>
        </div>
      </div>
    </Link>
  );
}
