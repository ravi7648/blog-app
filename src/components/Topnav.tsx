import LoginButton from "./login/LoginButton";
import ProfileIcon from "./shared/ProfileIcon";
import { useCurrentUser } from "../hooks/useCurrentUser";
import "./Topnav.css";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/appRoutes";

export default function Topnav() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="h-70 navbar navbar-dark bg-dark d-flex justify-content-end">
        {currentUser ? (
          <div
            className="d-flex gap-2 align-items-center justify-content-center me-2 cursor-pointer"
            data-bs-toogle="tooltip"
            title={currentUser.name}
            onClick={() => navigate(APP_ROUTES.PROFILE)}
          >
            <ProfileIcon user={currentUser} />
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
    </header>
  );
}
