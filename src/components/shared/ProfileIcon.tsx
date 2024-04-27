import User from "../../models/user";
import { getInitials } from "../../utils/userUtils";
import "./ProfileIcon.css";

export default function ProfileIcon(props: {
  user: User | null;
  size?: number;
  fontSize?: string;
  className?: string;
}) {
  const size = props.size || 50;
  const fontSize = props.fontSize || "1rem";

  return (
    <div
      className={"profile-icon " + props.className}
      style={{ height: size, width: size, fontSize: fontSize }}
    >
      <span> {getInitials(props.user?.name)}</span>
    </div>
  );
}
