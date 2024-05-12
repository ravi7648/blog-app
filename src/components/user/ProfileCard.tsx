import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "../../models/user";
import ProfileIcon from "../shared/ProfileIcon";
import UnfollowButton from "../shared/buttons/UnfollowButton";

export default function ProfileCard({ user, showUnfollowButton }: { user: User, showUnfollowButton?: boolean}) {
  return (
    <div className="d-flex border-bottom p-3 rounded-5 w-50">
      <ProfileIcon user={user} />
      <div className="d-flex ms-2 flex-column w-100">
        <h5>{user.name}</h5>

        <div className="w-100 d-flex">
          <span>
            <FontAwesomeIcon icon={faBuilding} /> {user.company?.name}
          </span>
          <span className="ms-3">
            <FontAwesomeIcon icon={faLocationDot} /> {user.address?.city}
          </span>
          {showUnfollowButton && <UnfollowButton className="ms-auto" userId={user.id} />}
        </div>
      </div>
    </div>
  );
}
