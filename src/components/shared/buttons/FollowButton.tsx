import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useAddFollows } from "../../../hooks/useReduxDispatchers";

export default function FollowButton({ userId }: { userId: number }) {
  const currentUser = useCurrentUser();
  const addFollow = useAddFollows();

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    if (!currentUser) return;
    const record = currentUser.follow(userId);
    addFollow(record);
  };

  return (
    <button
      className="ms-1 btn btn-sm btn-primary rounded-4"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faPlus} /> &nbsp; Follow
    </button>
  );
}
