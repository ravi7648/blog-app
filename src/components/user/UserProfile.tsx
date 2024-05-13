import { useCurrentUser } from "../../hooks/useCurrentUser";
import "./UserProfile.css";
import Profile from "./Profile";
import AuthGuard from "../../guards/AuthGuard";

export default function UserProfile() {
  const currentUser = useCurrentUser();

  return (
    <AuthGuard>
      <div className="p-4 w-100">
      <Profile user={currentUser} />
    </div>
    </AuthGuard>
  );
}
