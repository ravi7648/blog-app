import { MouseEventHandler } from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useUnfollow } from "../../../hooks/useReduxDispatchers";

export default function UnfollowButton({
  userId,
  className,
}: {
  userId: number;
  className?: string;
}) {
  const currentUser = useCurrentUser();
  const unfollow = useUnfollow();

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    if (!currentUser) return;
    const record = currentUser.unfollow(userId);
    unfollow(record);
  };

  return (
    <button
      className={"ms-1 btn btn-sm btn-primary rounded-4 " + className}
      onClick={handleClick}
    >
      Unfollow
    </button>
  );
}
