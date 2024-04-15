import User from "../../models/user";
import { getInitials } from "../../utilities/userUtilities";
import "./ProfileIcon.css";

export default function ProfileIcon(props: { user: User | null}) {
  return <div className="profile-icon">
    <span> { getInitials(props.user?.name) }</span>
  </div>;
}
