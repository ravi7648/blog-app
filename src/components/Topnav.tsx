import LoginButton from "./login/LoginButton";
import ProfileIcon from "./shared/ProfileIcon";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/appRoutes";
import { POPOVER_PLACEMENT, Tooltip } from "./shared/Tooltip";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "../hooks/useReduxDispatchers";
import "./Topnav.css";

export default function Topnav() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const logout = useLogout();

  function logoutUser() {
    logout();
    navigate(APP_ROUTES.HOME);
  }

  return (
    <header>
      <nav className="h-70 navbar navbar-dark bg-dark d-flex justify-content-end">
        {currentUser ? (
          <div className="d-flex align-items-center">
            <Tooltip
              text={currentUser.name}
              placement={POPOVER_PLACEMENT.BOTTOM}
            >
              <div
                className="d-flex gap-2 align-items-center justify-content-center me-2 cursor-pointer"
                onClick={() => navigate(APP_ROUTES.PROFILE)}
              >
                <ProfileIcon user={currentUser} />
              </div>
            </Tooltip>
            <div className="mx-2 vr-line"></div>
            <Tooltip text="Logout" placement={POPOVER_PLACEMENT.BOTTOM}>
              <span className="me-3 cursor-pointer" onClick={logoutUser}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="ms-2 fs-4"
                  style={{ color: "white" }}
                />
              </span>
            </Tooltip>
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
    </header>
  );
}
