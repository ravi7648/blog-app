import "./ProfileEdit.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileEdit() {
const currentUser = useCurrentUser();
  return <ProfileEditForm user={currentUser} isOwner/>;
}
