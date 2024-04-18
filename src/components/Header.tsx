import { NavLink, useNavigate } from "react-router-dom";
import AppBrand from "./common/AppBrand";
import { logout } from "../redux/slices/sessionSlice";
import LoginButton from "./login/LoginButton";
import ProfileIcon from "./common/ProfileIcon";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../hooks/dispatcher";
import { APP_ROUTES } from "../constants/appRoutes";
import { ALERT_MESSAGES } from "../constants/messages";
import { useCurrentUser } from "../hooks/session";

export default function Header() {
  const currentUser = useCurrentUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    navigate(APP_ROUTES.HOME);
    alert(ALERT_MESSAGES.LOGOUT_SUCCESS);
  }

  return (
    <header className="Header">
      <nav className="navbar navbar-dark bg-dark d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <AppBrand />
          <ul className="ms-3 navbar-nav d-flex flex-row gap-5">
            <li className="nav-item active">
              <NavLink to={APP_ROUTES.HOME} className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={APP_ROUTES.POSTS} className="nav-link">
                Blogs
              </NavLink>
            </li>
          </ul>
        </div>
        {currentUser ? (
          <div className="d-flex gap-2 align-items-center justify-content-center me-2">
            <ProfileIcon user={currentUser} />
            <div className="vr-line"></div>
            <button className="btn btn-secondary" onClick={logoutUser}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
    </header>
  );
}
