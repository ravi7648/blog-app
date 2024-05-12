import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFollowers } from "../../hooks/useFollows";
import { useUsers } from "../../hooks/useReduxSelectors";
import NoDataIcon from "../shared/NoDataIcon";
import ProfileCard from "./ProfileCard";

export default function Follower() {
  const currentUser = useCurrentUser();
  const params = useParams();
  const users = useUsers();
  const followers = useFollowers(Number(params.id) || currentUser?.id || 0);

  const followerUsers = followers.map(
    (userId) => users.data?.filter((user) => user.id === userId).at(0)!
  );

  return (
    <div className="border-cover mt-5 child-mb">
      {followerUsers.length ? (
        followerUsers.map((user) => <ProfileCard key={user.id} user={user}/>)
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <NoDataIcon />
        </div>
      )}
    </div>
  );
}
