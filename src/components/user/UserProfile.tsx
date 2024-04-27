import { useCurrentUser } from "../../hooks/useCurrentUser";
import "./UserProfile.css";
import Profile from "./Profile";

export default function UserProfile() {
  const currentUser = useCurrentUser();

  return (
    <div className="p-4 w-100">
      <Profile user={currentUser} />
    </div>
  );
}
