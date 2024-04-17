import User from "../../models/user";
import { getInitials } from "../../utils/userUtils";
import "./ProfileIcon.css";

export default function ProfileIcon(props: { user: User | null}) {
  return <div className="profile-icon">
    <span> { getInitials(props.user?.name) }</span>
  </div>;
}
