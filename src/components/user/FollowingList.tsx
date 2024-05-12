import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFollowing } from "../../hooks/useFollows";
import { useUsers } from "../../hooks/useReduxSelectors";
import NoDataIcon from "../shared/NoDataIcon";
import ProfileCard from "./ProfileCard";

export default function Following() {
  const currentUser = useCurrentUser();
  const params = useParams();
  const users = useUsers();
  const following = useFollowing(Number(params.id) || currentUser?.id || 0);
  const selfView = currentUser?.id === Number(params.id) || params.id === undefined;

  const followingUsers = following.map(
    (userId) => users.data?.filter((user) => user.id === userId).at(0)!
  );

  return (
    <div className="border-cover mt-5 child-mb">
      {followingUsers.length ? (
        followingUsers.map((user) => <ProfileCard key={user.id} user={user} showUnfollowButton={selfView}/>)
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <NoDataIcon />
        </div>
      )}
    </div>
  );
}
